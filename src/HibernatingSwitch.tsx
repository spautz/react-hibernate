import * as React from 'react';
import { ReactNode } from 'react';
import { useLimitedCache } from 'limited-cache/hooks';
import { isElement } from 'react-is';
import { createPortalNode, InPortal, OutPortal, PortalNode } from 'react-reverse-portal';
import {
  Redirect,
  Route,
  RouteComponentProps,
  RouteProps,
  Switch,
  SwitchProps,
} from 'react-router';

import HibernatingRoute from './HibernatingRoute';
import renderRoute from './renderRoute';

interface HibernatingSwitchProps extends SwitchProps {
  children: ReactNode;
  maxCacheSize?: number;
  maxCacheTime?: number;
}

type PortalRecord = {
  portalNode: PortalNode;
  routerProps: RouteComponentProps;
  routeProps: RouteProps;
};

const HibernatingSwitch: React.FC<HibernatingSwitchProps> = ({
  children,
  maxCacheSize,
  maxCacheTime,
  ...allOtherProps
}: HibernatingSwitchProps) => {
  const portalRecordCache = useLimitedCache({
    maxCacheSize,
    maxCacheTime,
  });

  const currentPathKeyRef = React.useRef<string>();
  const currentPathKey = currentPathKeyRef.current;
  const [currentPortalRecord, setCurrentPortalRecord] = React.useState<PortalRecord | null>(null);

  const activatePortalForComponent = (
    routerProps: RouteComponentProps,
    routeProps: RouteProps,
  ): void => {
    // We don't really care about the *path* that was matched. Instead, we care about the *url* that activated us
    const pathKey = routerProps.match.url;

    if (pathKey === currentPathKey) {
      // Nothing has really changed: just update any props
      (currentPortalRecord as PortalRecord).routerProps = routerProps;
      (currentPortalRecord as PortalRecord).routeProps = routeProps;
    } else {
      // New route! Stash the old and move to the new
      if (currentPathKey) {
        portalRecordCache.set(currentPathKey, currentPortalRecord);
      }

      const previousPortalRecord = portalRecordCache.get(pathKey);
      let newPortalRecord;
      if (previousPortalRecord) {
        // Reactivate the prior subtree
        previousPortalRecord.routerProps = routerProps;
        previousPortalRecord.routeProps = routeProps;
        newPortalRecord = previousPortalRecord;
      } else {
        // Make a new portal for the new subtree
        newPortalRecord = {
          portalNode: createPortalNode(),
          routerProps,
          routeProps,
        };
      }

      currentPathKeyRef.current = pathKey;
      setCurrentPortalRecord(newPortalRecord);
    }
  };

  const deactivatePortal = (): void => {
    if (currentPathKey && currentPortalRecord) {
      portalRecordCache.set(currentPathKey, currentPortalRecord);
      // We need to unmount the old OutPortal *immediately* so that it can swap in its original dom node,
      // or else React hits an error trying to unmount in the incorrect node
      currentPortalRecord.portalNode.unmount();

      currentPathKeyRef.current = '';
      setCurrentPortalRecord(null);
    }
  };

  const childrenWithHibernation = React.Children.map(children, (child) => {
    if (isElement(child)) {
      const {
        type,
        props: routeProps,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        props: { children, component, isHibernatingRoute, render, ...allOtherRouteProps },
      } = child;

      if (type === HibernatingRoute || isHibernatingRoute) {
        // Replace it: it will activate the remote node when the route matches
        return (
          <Route
            {...allOtherRouteProps}
            render={(routerProps): null => {
              activatePortalForComponent(routerProps, routeProps);
              return null;
            }}
          />
        );
      }

      if (type !== Redirect && isHibernatingRoute !== false) {
        // Every child should either be a Hibernating Route, vanilla Route, or Redirect -- and if it's neither a
        // vanilla route nor a Hibernating Route, it's probably a custom wrapper around Route.
        // If it's any non-Hibernating route Route then we need to deactivate any portal which might be active from
        // a Hibernating Route. But no matter what it might be, we want to deactivate before rendering, to be safe.
        return (
          <Route
            {...allOtherRouteProps}
            render={(routerProps: RouteComponentProps): ReactNode => {
              deactivatePortal();
              return renderRoute(routerProps, routeProps);
            }}
          />
        );
      }
    }
    // If it's a Redirect, or anything we can't recognize, let it pass through as-is
    return child;
  });

  const portalRecordCacheFull = portalRecordCache.get();

  const allPortalKeys: Array<string> = Object.keys(portalRecordCacheFull);
  if (currentPathKey && !allPortalKeys.includes(currentPathKey)) {
    allPortalKeys.push(currentPathKey);
  }

  return (
    <React.Fragment>
      <Switch {...allOtherProps}>{childrenWithHibernation}</Switch>
      <React.Fragment>
        {allPortalKeys.map((pathKey) => {
          const portalRecord =
            pathKey === currentPathKey ? currentPortalRecord : portalRecordCacheFull[pathKey];

          if (!portalRecord) {
            console.warn(`portalRecord is missing for pathKey "${pathKey}"`);
            return null;
          }

          const { portalNode, routerProps, routeProps } = portalRecord;

          return (
            <InPortal key={pathKey} node={portalNode}>
              {renderRoute(routerProps, routeProps)}
            </InPortal>
          );
        })}

        {!!currentPortalRecord && <OutPortal node={currentPortalRecord.portalNode} />}
      </React.Fragment>
    </React.Fragment>
  );
};
HibernatingSwitch.defaultProps = {
  maxCacheSize: 5,
  maxCacheTime: 5 * 60 * 1000,
};

export default HibernatingSwitch;
export { HibernatingSwitchProps };
