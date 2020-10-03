/* eslint-env jest */
// import '@testing-library/jest-dom/extend-expect';
import { Store } from 'redux';

import { createDevHelperStore, incrementAction } from 'react-hibernate-dev-helpers';

import { createPauseableStore } from '../src';

describe('store interface', () => {
  let rootStore: Store;
  beforeEach(() => {
    rootStore = createDevHelperStore();
  });

  it('adds listeners', () => {
    const myStore = createPauseableStore(rootStore);

    const listenerFn = jest.fn(() => {});

    myStore.subscribe(listenerFn);

    // We should be called once per update
    rootStore.dispatch(incrementAction());
    expect(listenerFn.mock.calls.length).toBe(1);

    rootStore.dispatch(incrementAction());
    expect(listenerFn.mock.calls.length).toBe(2);
  });

  it('does not call listener when paused', () => {
    const myStore = createPauseableStore(rootStore, {
      isPaused: true,
      notifyListersOnUnpause: false,
    });

    const listenerFn = jest.fn(() => {});

    myStore.subscribe(listenerFn);

    rootStore.dispatch(incrementAction());
    rootStore.dispatch(incrementAction());
    expect(listenerFn.mock.calls.length).toBe(0);

    myStore.setPaused(false);

    rootStore.dispatch(incrementAction());
    expect(listenerFn.mock.calls.length).toBe(1);
  });

  it('calls listeners when unpaused', () => {
    const myStore = createPauseableStore(rootStore, {
      isPaused: true,
      notifyListersOnUnpause: true,
    });

    const listenerFn = jest.fn(() => {});

    myStore.subscribe(listenerFn);

    rootStore.dispatch(incrementAction());
    expect(listenerFn.mock.calls.length).toBe(0);

    myStore.setPaused(false);

    expect(listenerFn.mock.calls.length).toBe(1);
  });

  it('unsubscribes listeners', () => {
    const myStore = createPauseableStore(rootStore);

    const listenerFn = jest.fn(() => {});

    const unsubscribeFn = myStore.subscribe(listenerFn);

    // Listen once, then unsubscribe
    rootStore.dispatch(incrementAction());
    expect(listenerFn.mock.calls.length).toBe(1);

    unsubscribeFn();

    rootStore.dispatch(incrementAction());
    rootStore.dispatch(incrementAction());
    expect(listenerFn.mock.calls.length).toBe(1);
  });

  it('cannot replaceReducer', () => {
    const myStore = createPauseableStore(rootStore);

    expect(() => {
      myStore.replaceReducer((state) => ({ ...state }));
    }).toThrow(
      'Cannot replaceReducer on a pauseableStore: replaceReducer on the parent store, instead',
    );
  });
});
