import * as React from 'react';
import { ReactElement, ReactNode } from 'react';
import { useLimitedCache } from 'limited-cache/hooks';
import { isElement } from 'react-is';
import { createPortalNode, InPortal, OutPortal } from 'react-reverse-portal';
import { Route, Switch, SwitchProps } from 'react-router';

import HibernatingRoute from './HibernatingRoute';

interface HibernatingSwitchProps extends SwitchProps {
  children: ReactNode;
  maxCacheSize?: number;
  maxCacheTime?: number;
}

const HibernatingSwitch: React.FC<HibernatingSwitchProps> = ({
  children,
  maxCacheSize,
  maxCacheTime,
  ...allOtherProps
}: HibernatingSwitchProps) => {
  const portalCache = useLimitedCache({
    maxCacheSize,
    maxCacheTime,
  });

  console.log('HibernatingSwitch()', { children, maxCacheSize, maxCacheTime, ...allOtherProps });

  const [currentKey, setCurrentKey] = React.useState<string | null>(null);

  const activateComponent = React.useCallback(
    (pathOrIndex, props) => {
      console.log('activateComponent!', pathOrIndex, props);

      const pathKey = JSON.stringify(pathOrIndex);
      const existingPortalNode = portalCache.get(pathKey);
      console.log('existingPortalNode? ', existingPortalNode);
      if (existingPortalNode) {
        existingPortalNode.props = props;
        portalCache.set(pathKey, existingPortalNode);
      } else {
        portalCache.set(pathKey, {
          portalNode: createPortalNode(),
          props,
        });
      }
      if (pathKey !== currentKey) {
        setCurrentKey(pathKey);
      }
    },
    [currentKey],
  );

  const childrenWithHibernation = React.Children.map(children, (child, index) => {
    const {
      type,
      props: {
        path,
        isHibernatingRoute,
        render,
        component,
        children: routeChildren,
        ...allOtherRouteProps
      },
    } = child as ReactElement;

    if (isElement(child) && (type === HibernatingRoute || isHibernatingRoute)) {
      const pathOrIndex = path || `index@@${index}`;

      // Replace it: it will activate the remote node when the route matches
      return (
        <Route
          {...allOtherRouteProps}
          path={path}
          render={(): null => {
            activateComponent(pathOrIndex, {
              render,
              component,
              children: routeChildren,
            });

            return null;
          }}
        />
      );
    }
    return child;
  });

  console.log('childrenWithHibernation = ', childrenWithHibernation);

  const portalCacheFull = portalCache.get();
  console.log('portalCacheFull = ', portalCacheFull);

  return (
    <React.Fragment>
      <Switch {...allOtherProps}>{childrenWithHibernation}</Switch>
      <React.Fragment>
        {Object.keys(portalCacheFull).map((pathKey) => {
          const { portalNode, props } = portalCacheFull[pathKey];

          console.log('Rendering InPortal: ', pathKey, portalNode, props);

          return (
            <InPortal key={pathKey} node={portalNode}>
              {/* @TODO: support render, component, etc */}
              {props.children}
            </InPortal>
          );
        })}
      </React.Fragment>
      {!!currentKey && portalCacheFull[currentKey] && (
        <OutPortal node={portalCacheFull[currentKey].portalNode} />
      )}
    </React.Fragment>
  );
};
HibernatingSwitch.defaultProps = {
  maxCacheSize: 5,
  maxCacheTime: 5 * 60 * 1000,
};

export default HibernatingSwitch;
export { HibernatingSwitchProps };
