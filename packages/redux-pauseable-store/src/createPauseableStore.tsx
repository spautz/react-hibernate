import { Action, Store } from 'redux';

import { PauseableStoreInstance, PauseableStoreOptions } from './types';

const createPauseableStore = (
  parentStore: Store,
  options?: PauseableStoreOptions,
): PauseableStoreInstance => {
  const {
    isPaused: isInitiallyPaused = false,
    canDispatch: canInitiallyDispatch = 'warn',
    notifyListersOnUnpause: notifyListenersInitially = true,
  } = options || {};

  const pauseableStore = {} as PauseableStoreInstance;
  let stateAtPause = isInitiallyPaused ? parentStore.getState() : null;
  const listeners: Array<() => void> = [];

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
    listeners.push(listener);

    const wrappedListener = () => {
      // Ignore when paused
      if (!pauseableStore.isPaused) {
        listener();
      }
    };

    const unsubscribe = parentStore.subscribe(wrappedListener);
    const wrappedUnsubscribe = () => {
      const indexOfListener = listeners.findIndex(listener);
      listeners.splice(indexOfListener, 1);
      unsubscribe();
    };

    return wrappedUnsubscribe;
  };

  const getState = () => {
    if (pauseableStore.isPaused) {
      return stateAtPause;
    }
    return parentStore.getState();
  };

  const setPaused = (newIsPaused: boolean) => {
    pauseableStore.isPaused = newIsPaused;
    const currentState = parentStore.getState();

    if (newIsPaused) {
      stateAtPause = currentState;
    } else {
      if (pauseableStore.notifyListersOnUnpause && currentState !== stateAtPause) {
        // Let subscribers know that something has changed
        listeners.forEach((listener) => listener());
      }
      stateAtPause = null;
    }
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
    notifyListersOnUnpause: notifyListenersInitially,

    _parentStore: parentStore,
  });

  return pauseableStore;
};

export default createPauseableStore;
