import React, { ReactNode } from 'react';
import { RouteComponentProps, RouteProps } from 'react-router';

// This is based on how <Route> itself renders things, in react-router v5:
// https://github.com/ReactTraining/react-router/blob/f20cd62495c7bc4f8949ae6d28afe587f62b557a/packages/react-router/modules/Route.js#L56-L72
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
      ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
        React.createElement(component as any, routerProps)
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
