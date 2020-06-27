import { Action, Store } from 'redux';

import { PauseableStore, PauseableStoreOptions } from './types';

const createPauseableStore = (
  parentStore: Store,
  options: PauseableStoreOptions,
): PauseableStore => {
  let { isPaused = false, canDispatch = 'warn' } = options || {};
  const pauseableStore = {} as PauseableStore;
  let stateWhenPaused = isPaused ? parentStore.getState() : null;

  const dispatch = (action: Action) => {
    if (canDispatch === 'warn') {
      console.warn(
        'Something is trying to dispatch an action to a PauseableStore. Set `canDispatch` to true or false to disable this warning.',
        { action, pauseableStore },
      );
    }
    if (canDispatch) {
      return parentStore.dispatch(action);
    }
    return null;
  };

  const subscribe = (listener: () => void) => {
    return parentStore.subscribe(() => {
      // Ignore when paused
      if (!isPaused) {
        listener();
      }
    });
  };

  const getState = () => {
    if (isPaused) {
      return stateWhenPaused;
    }
    return parentStore.getState();
  };

  const setPaused = (newIsPaused: boolean) => {
    pauseableStore.isPaused = isPaused = newIsPaused;

    stateWhenPaused = isPaused ? parentStore.getState() : null;
  };

  const setDispatch = (newCanDispatch: boolean | 'warn') => {
    pauseableStore.canDispatch = canDispatch = newCanDispatch;
  };

  const replaceReducer = () => {
    throw new Error(
      'Cannot replaceReducer on a pauseableStore: replaceReducer on the parent store, instead',
    );
  };

  Object.assign(pauseableStore, {
    // Redux Store interface
    ...parentStore,
    dispatch,
    subscribe,
    getState,
    replaceReducer,
    // @TODO: Do we also need to handle [$$observable]: observable, ?

    // PauseableStore additions
    isPaused,
    setPaused,
    canDispatch,
    setDispatch,

    _parentStore: parentStore,
  });

  return pauseableStore;
};

export default createPauseableStore;
