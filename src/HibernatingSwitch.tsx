import * as React from 'react';
import { ReactElement } from 'react';
import { useLimitedCache } from 'limited-cache/hooks';
import { isElement } from 'react-is';
import { createPortalNode, InPortal, OutPortal } from 'react-reverse-portal';
import { Route, Switch } from 'react-router';

import HibernatingRoute from './HibernatingRoute';

interface HibernatingSwitchProps {
  children: ReactElement;
  maxCacheSize: number;
  maxCacheTime: number;
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
    (path, props) => {
      const pathKey = JSON.stringify(path);
      const existingPortalNode = portalCache.get(pathKey);
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

  const childrenWithHibernation = React.Children.map(children, (child) => {
    const {
      type,
      props: { path, isHibernatingRoute },
    } = child as ReactElement;

    if (isElement(child) && (type === HibernatingRoute || isHibernatingRoute)) {
      const key = JSON.stringify(path);

      console.log('Replacing element: ', child, key);

      // Replace it: it will only activate the remote node when the route matches, now
      return (
        <Route
          path={path}
          render={(): null => {
            activateComponent(key, {
              ...(child as ReactElement),
              type: Route,
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
      <div style={{ display: 'none' }}>
        {Object.keys(portalCacheFull).map((key) => {
          const { portalNode, child } = portalCacheFull[key];
          return (
            <InPortal key={key} node={portalNode}>
              {/* The best way to assure absolutely the same behavior as react-router is to use it directly */}
              {child}
            </InPortal>
          );
        })}
      </div>
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
