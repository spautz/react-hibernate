import * as React from 'react';
import { Route } from 'react-router';

const HibernatingRoute: React.FC<{}> = (props) => {
  // This component is used ONLY as an indicator to HibernatingSwitch that it needs to keep this subtree around
  // even after the element itself unmounts. HibernatingSwitch will replace each <HibernatingRoute> with a standard
  // <Route> (with the extra wiring to make hibernation happen) -- so this component should never actually render.
  //
  // If this ever does render then it means the component wasn't swapped out -- so it's not being used properly.
  console.warn(
    'HibernatingRoute is being used as a standalone component, instead of as a child of HibernatingSwitch. This will not do anything.',
    props,
  );

  return <Route {...props} />;
};

export default HibernatingRoute;
