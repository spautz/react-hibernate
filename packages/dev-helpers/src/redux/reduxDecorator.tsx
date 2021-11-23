import { ReactNode, useMemo } from 'react';
import { Provider } from 'react-redux';

import { createDevHelperStore } from './store';

const reduxDecorator = (storyFn: () => ReactNode): ReactNode => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const devHelperStore = useMemo(createDevHelperStore, []);

  return <Provider store={devHelperStore}>{storyFn()}</Provider>;
};

export default reduxDecorator;
