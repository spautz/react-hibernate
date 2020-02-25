import React, { PropsWithChildren, ReactElement } from 'react';
import { Store } from 'redux';
import { Provider, useStore } from 'react-redux';

import { StaticContainerProps } from './types';

const StaticReduxContainer: React.FC<StaticContainerProps> = ({
  shouldUpdate,
  children,
}: PropsWithChildren<StaticContainerProps>): ReactElement | null => {
  const store = useStore();
  const staticStoreRef = React.useRef<Store>();
  const wasActiveRef = React.useRef<boolean>();

  if (!shouldUpdate) {
    if (wasActiveRef.current) {
      // We're going inactive: freeze the store contents as best we can
      console.log('freezing store...', store);
      const stateAtFreeze = store.getState();
      staticStoreRef.current = {
        ...store,
        getState: (): ReturnType<typeof store.getState> => stateAtFreeze,
      };

      wasActiveRef.current = false;
    } else {
      // We're somehow being rendered in an initially-inactive state: that can't be right
      if (process.env.NODE_ENV !== 'production') {
        console.warn(
          'StaticReduxContainer is being mounted with shouldUpdate=false: this is probably a bug',
        );
      }
      return null;
    }
  }
  return (
    <Provider store={shouldUpdate ? store : (staticStoreRef.current as Store)}>{children}</Provider>
  );
};

export default StaticReduxContainer;
