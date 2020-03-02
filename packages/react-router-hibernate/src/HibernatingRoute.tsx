import React, { ReactElement } from 'react';
import { Route, RouteProps } from 'react-router';

type HibernatingRouteProps = RouteProps;

const HibernatingRoute: React.FC<HibernatingRouteProps> = (
  props: HibernatingRouteProps,
): ReactElement => {
  // This component is used ONLY as an indicator to HibernatingSwitch that it needs to keep this subtree around
  // even after the element itself unmounts. HibernatingSwitch will replace each <HibernatingRoute> with a standard
  // <Route> (with the extra wiring to make hibernation happen) -- so this component should never actually render.
  //
  // If this ever does render then it means the component wasn't swapped out -- so it's not being used properly.
  if (process.env.NODE_ENV !== 'production') {
    console.warn(
      'HibernatingRoute is being used as a standalone component, instead of as a child of HibernatingSwitch. This will not do anything.',
      props,
    );
  }

  return <Route {...props} />;
};

export default HibernatingRoute;
export { HibernatingRouteProps };
