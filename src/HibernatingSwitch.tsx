import * as React from 'react';
import { ReactNode } from 'react';
import { useLimitedCache } from 'limited-cache/hooks';
import { isElement } from 'react-is';
import { createPortalNode, InPortal, OutPortal, PortalNode } from 'react-reverse-portal';
import { Route, RouteComponentProps, RouteProps, Switch, SwitchProps } from 'react-router';

import HibernatingRoute from './HibernatingRoute';

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
  const [currentPortalRecord, setCurrentPortalRecord] = React.useState<PortalRecord>();

  const activateComponent = (routerProps: RouteComponentProps, routeProps: RouteProps): void => {
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

  const childrenWithHibernation = React.Children.map(children, (child) => {
    if (isElement(child)) {
      const {
        type,
        props: routeProps,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        props: { children, component, isHibernatingRoute, render, ...allOtherRouteProps },
      } = child;

      if (isElement(child) && (type === HibernatingRoute || isHibernatingRoute)) {
        // Replace it: it will activate the remote node when the route matches
        return (
          <Route
            {...allOtherRouteProps}
            render={(routerProps): null => {
              activateComponent(routerProps, routeProps);
              return null;
            }}
          />
        );
      }
    }
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
          const { portalNode, routerProps, routeProps } = portalRecord;

          return (
            <InPortal key={pathKey} node={portalNode}>
              {/* this is based on https://github.com/ReactTraining/react-router/blob/7a9170d759af1a02a473d631f411459aeaa562c2/packages/react-router/modules/Route.js#L56-L72 */}
              {routerProps.match
                ? routeProps.children
                  ? typeof routeProps.children === 'function'
                    ? process.env.NODE_ENV !== 'production'
                      ? routeProps.children(routerProps) || null
                      : routeProps.children(routerProps)
                    : routeProps.children
                  : routeProps.component
                  ? React.createElement(routeProps.component, routerProps)
                  : routeProps.render
                  ? routeProps.render(routerProps)
                  : null
                : typeof children === 'function'
                ? process.env.NODE_ENV !== 'production'
                  ? routeProps.children(routerProps) || null
                  : routeProps.children(routerProps)
                : null}
            </InPortal>
          );
        })}
      </React.Fragment>

      {!!currentPortalRecord && <OutPortal node={currentPortalRecord.portalNode} />}
    </React.Fragment>
  );
};
HibernatingSwitch.defaultProps = {
  maxCacheSize: 5,
  maxCacheTime: 5 * 60 * 1000,
};

export default HibernatingSwitch;
export { HibernatingSwitchProps };
