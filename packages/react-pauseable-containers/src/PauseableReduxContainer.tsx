import React, { PropsWithChildren, ReactElement } from 'react';
import { Store } from 'redux';
import { Provider, useStore } from 'react-redux';

import { PauseableContainerProps } from './types';

const PauseableReduxContainer: React.FC<PauseableContainerProps> = ({
  shouldUpdate,
  children,
}: PropsWithChildren<PauseableContainerProps>): ReactElement | null => {
  const store = useStore();
  const staticStoreRef = React.useRef<Store>();
  const wasActiveRef = React.useRef<boolean>();

  const stateWhenLastActive = React.useRef<Store>();

  if (shouldUpdate) {
    // Track stuff for when we go inactive
    stateWhenLastActive.current = store.getState();
  } else {
    if (wasActiveRef.current) {
      // We're going inactive: freeze the store contents to the last-active state
      staticStoreRef.current = {
        ...store,
        getState: (): ReturnType<typeof store.getState> => stateWhenLastActive.current,
      };
    } else {
      // We're somehow being rendered in an initially-inactive state: that can't be right
      if (process.env.NODE_ENV !== 'production') {
        console.warn(
          'PauseableReduxContainer is being mounted with shouldUpdate=false: this is probably a bug',
        );
      }
      return null;
    }
  }

  wasActiveRef.current = shouldUpdate;
  return (
    <Provider store={shouldUpdate ? store : (staticStoreRef.current as Store)}>{children}</Provider>
  );
};

export default PauseableReduxContainer;
