import React, { ReactNode } from 'react';
import { RouteComponentProps, RouteProps } from 'react-router';

// This is based on how <Route> itself renders things, in react-router v5:
// https://github.com/ReactTraining/react-router/blob/7a9170d759af1a02a473d631f411459aeaa562c2/packages/react-router/modules/Route.js#L56-L72 */}
const renderRoute = (routerProps: RouteComponentProps, routeProps: RouteProps): ReactNode => {
  const { children, component, render } = routeProps;

  return routerProps.match
    ? children
      ? typeof children === 'function'
        ? process.env.NODE_ENV !== 'production'
          ? children(routerProps) || null
          : children(routerProps)
        : children
      : component
      ? React.createElement(component, routerProps)
      : render
      ? render(routerProps)
      : null
    : typeof children === 'function'
    ? process.env.NODE_ENV !== 'production'
      ? children(routerProps) || null
      : children(routerProps)
    : null;
};

export default renderRoute;
