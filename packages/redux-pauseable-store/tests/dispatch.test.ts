/* eslint-env jest */
// import '@testing-library/jest-dom/extend-expect';
import { Store } from 'redux';

import { createDevHelperStore, incrementAction } from 'react-hibernate-dev-helpers';

import { createPauseableStore } from '../src';

describe('dispatch', () => {
  let rootStore: Store;
  beforeEach(() => {
    rootStore = createDevHelperStore();
  });

  it('dispatches when allowed', () => {
    const myStore = createPauseableStore(rootStore, { canDispatch: true });

    myStore.dispatch(incrementAction());
    expect(rootStore.getState()).toEqual({
      count: 1,
    });

    myStore.dispatch(incrementAction());
    expect(rootStore.getState()).toEqual({
      count: 2,
    });
  });

  it('does not dispatch when not allowed', () => {
    const myStore = createPauseableStore(rootStore, { canDispatch: false });

    myStore.dispatch(incrementAction());
    expect(rootStore.getState()).toEqual({
      count: 0,
    });

    myStore.dispatch(incrementAction());
    expect(rootStore.getState()).toEqual({
      count: 0,
    });
  });

  it('warns on dispatch when paused, by default', () => {
    const myStore = createPauseableStore(rootStore, { isPaused: true });
    const consoleWarnSpy = jest.spyOn(global.console, 'warn').mockImplementationOnce(() => null);

    myStore.dispatch(incrementAction());

    expect(console.warn).toHaveBeenCalledTimes(1);
    expect(console.warn).toHaveBeenLastCalledWith(
      'Something is trying to dispatch an action to a paused PauseableStore. Set `canDispatch` to true or false to disable this warning.',
      { action: incrementAction(), pauseableStore: myStore },
    );
    consoleWarnSpy.mockRestore();

    // but the dispatch still happened
    expect(rootStore.getState()).toEqual({
      count: 1,
    });
  });

  it('disables and then enables dispatch', () => {
    const myStore = createPauseableStore(rootStore);

    myStore.dispatch(incrementAction());
    expect(rootStore.getState()).toEqual({
      count: 1,
    });

    myStore.setDispatch(false);

    myStore.dispatch(incrementAction());
    myStore.dispatch(incrementAction());
    expect(rootStore.getState()).toEqual({
      count: 1,
    });

    myStore.setDispatch(true);

    myStore.dispatch(incrementAction());
    expect(rootStore.getState()).toEqual({
      count: 2,
    });
  });

  it('enables and then re-disables dispatch', () => {
    const myStore = createPauseableStore(rootStore, {
      canDispatch: false,
    });

    myStore.dispatch(incrementAction());
    myStore.dispatch(incrementAction());
    expect(rootStore.getState()).toEqual({
      count: 0,
    });

    myStore.setDispatch(true);

    myStore.dispatch(incrementAction());
    expect(rootStore.getState()).toEqual({
      count: 1,
    });

    myStore.setDispatch(false);

    myStore.dispatch(incrementAction());
    myStore.dispatch(incrementAction());
    expect(rootStore.getState()).toEqual({
      count: 1,
    });
  });
});
