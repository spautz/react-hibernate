import React, { ReactNode } from 'react';
import { Provider } from 'react-redux';

import store from './store';

const reduxDecorator = (storyFn: () => ReactNode): ReactNode => {
  return <Provider store={store}>{storyFn()}</Provider>;
};

export default reduxDecorator;
