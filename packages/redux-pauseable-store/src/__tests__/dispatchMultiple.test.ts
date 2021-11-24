/* eslint-env jest */
// import '@testing-library/jest-dom/extend-expect';
import { Store } from 'redux';

import { createDevHelperStore, incrementAction } from 'react-hibernate-dev-helpers';

import { createPauseableStore, PauseableStoreInstance } from '../index';

describe('dispatch with a chain of multiple parent stores', () => {
  let rootStore: Store;
  let grandparentStore: PauseableStoreInstance;
  let parentStore: PauseableStoreInstance;
  beforeEach(() => {
    rootStore = createDevHelperStore();
    grandparentStore = createPauseableStore(rootStore);
    parentStore = createPauseableStore(grandparentStore);
  });

  it('dispatches when allowed', () => {
    const myStore = createPauseableStore(parentStore, { canDispatch: true });

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
    const myStore = createPauseableStore(parentStore, { canDispatch: false });

    myStore.dispatch(incrementAction());
    expect(rootStore.getState()).toEqual({
      count: 0,
    });

    myStore.dispatch(incrementAction());
    expect(rootStore.getState()).toEqual({
      count: 0,
    });
  });

  it('warns on dispatch when grandparent is paused, by default', () => {
    const myStore = createPauseableStore(parentStore);
    const consoleWarnSpy = jest.spyOn(global.console, 'warn').mockImplementationOnce(() => null);

    grandparentStore.setPaused(true);
    myStore.dispatch(incrementAction());

    expect(console.warn).toHaveBeenCalledTimes(1);
    expect(console.warn).toHaveBeenLastCalledWith(
      'Something is trying to dispatch an action to a paused PauseableStore. Set `canDispatch` to true or false to disable this warning.',
      { action: incrementAction(), pauseableStore: grandparentStore },
    );
    consoleWarnSpy.mockRestore();

    // but the dispatch still happened
    expect(rootStore.getState()).toEqual({
      count: 1,
    });
  });

  it('warns on dispatch when parent is paused, by default', () => {
    const myStore = createPauseableStore(parentStore);
    const consoleWarnSpy = jest.spyOn(global.console, 'warn').mockImplementationOnce(() => null);

    parentStore.setPaused(true);
    myStore.dispatch(incrementAction());

    expect(console.warn).toHaveBeenCalledTimes(1);
    expect(console.warn).toHaveBeenLastCalledWith(
      'Something is trying to dispatch an action to a paused PauseableStore. Set `canDispatch` to true or false to disable this warning.',
      { action: incrementAction(), pauseableStore: parentStore },
    );
    consoleWarnSpy.mockRestore();

    // but the dispatch still happened
    expect(rootStore.getState()).toEqual({
      count: 1,
    });
  });

  it('stops dispatch at grandparent when grandparent disabled', () => {
    const myStore = createPauseableStore(parentStore);

    grandparentStore.setDispatch(false);

    myStore.dispatch(incrementAction());
    parentStore.dispatch(incrementAction());
    grandparentStore.dispatch(incrementAction());

    expect(rootStore.getState()).toEqual({
      count: 0,
    });
  });

  it('stops updates at parent when parent paused', () => {
    const myStore = createPauseableStore(parentStore);

    parentStore.setDispatch(false);

    myStore.dispatch(incrementAction());
    parentStore.dispatch(incrementAction());
    grandparentStore.dispatch(incrementAction());

    expect(rootStore.getState()).toEqual({
      count: 1,
    });
  });

  it('dispatches properly when ancestors enable/disable dispatch', () => {
    const myStore = createPauseableStore(parentStore);

    parentStore.setDispatch(false);
    myStore.dispatch(incrementAction());
    parentStore.dispatch(incrementAction());
    grandparentStore.dispatch(incrementAction());

    // only grandparent worked
    expect(rootStore.getState()).toEqual({
      count: 1,
    });

    grandparentStore.setDispatch(false);
    myStore.dispatch(incrementAction());
    parentStore.dispatch(incrementAction());
    grandparentStore.dispatch(incrementAction());

    // none worked
    expect(rootStore.getState()).toEqual({
      count: 1,
    });

    parentStore.setDispatch(true);
    myStore.dispatch(incrementAction());
    parentStore.dispatch(incrementAction());
    grandparentStore.dispatch(incrementAction());

    // none worked because grandparent still disabled
    expect(rootStore.getState()).toEqual({
      count: 1,
    });

    myStore.setDispatch(false);
    grandparentStore.setDispatch(true);
    myStore.dispatch(incrementAction());
    parentStore.dispatch(incrementAction());
    grandparentStore.dispatch(incrementAction());

    // parent + grandparent worked
    expect(rootStore.getState()).toEqual({
      count: 3,
    });

    myStore.setDispatch(true);
    myStore.dispatch(incrementAction());
    parentStore.dispatch(incrementAction());
    grandparentStore.dispatch(incrementAction());

    // all worked
    expect(rootStore.getState()).toEqual({
      count: 6,
    });
  });
});
