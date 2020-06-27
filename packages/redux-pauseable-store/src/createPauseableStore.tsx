import { Action, Store } from 'redux';

import { PauseableStoreInstance, PauseableStoreOptions } from './types';

const createPauseableStore = (
  parentStore: Store,
  options?: PauseableStoreOptions,
): PauseableStoreInstance => {
  const { isPaused: isInitiallyPaused = false, canDispatch: canInitiallyDispatch = 'warn' } =
    options || {};

  const pauseableStore = {} as PauseableStoreInstance;
  let stateAtPause = isInitiallyPaused ? parentStore.getState() : null;

  const dispatch = (action: Action) => {
    if (
      pauseableStore.isPaused &&
      pauseableStore.canDispatch !== true &&
      pauseableStore.canDispatch !== false
    ) {
      console.warn(
        'Something is trying to dispatch an action to a paused PauseableStore. Set `canDispatch` to true or false to disable this warning.',
        { action, pauseableStore },
      );
    }
    if (pauseableStore.canDispatch) {
      return parentStore.dispatch(action);
    }
    return null;
  };

  const subscribe = (listener: () => void) => {
    return parentStore.subscribe(() => {
      // Ignore when paused
      if (!pauseableStore.isPaused) {
        listener();
      }
    });
  };

  const getState = () => {
    if (pauseableStore.isPaused) {
      return stateAtPause;
    }
    return parentStore.getState();
  };

  const setPaused = (newIsPaused: boolean) => {
    pauseableStore.isPaused = newIsPaused;

    stateAtPause = newIsPaused ? parentStore.getState() : null;
  };

  const setDispatch = (newCanDispatch: boolean | 'warn') => {
    pauseableStore.canDispatch = newCanDispatch;
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
    isPaused: isInitiallyPaused,
    setPaused,
    canDispatch: canInitiallyDispatch,
    setDispatch,

    _parentStore: parentStore,
  });

  return pauseableStore;
};

export default createPauseableStore;
