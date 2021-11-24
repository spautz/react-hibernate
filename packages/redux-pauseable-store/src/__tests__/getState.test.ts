/* eslint-env jest */
// import '@testing-library/jest-dom/extend-expect';
import { Store } from 'redux';

import { createDevHelperStore, incrementAction } from 'react-hibernate-dev-helpers';

import { createPauseableStore } from '../index';

describe('getState', () => {
  let rootStore: Store;
  beforeEach(() => {
    rootStore = createDevHelperStore();
  });

  it('creates a pauseableStore', () => {
    const myStore = createPauseableStore(rootStore);

    expect(myStore.getState()).toEqual({
      count: 0,
    });
  });

  it('updates when not paused', () => {
    const myStore = createPauseableStore(rootStore);

    rootStore.dispatch(incrementAction());
    expect(myStore.getState()).toEqual({
      count: 1,
    });

    rootStore.dispatch(incrementAction());
    expect(myStore.getState()).toEqual({
      count: 2,
    });
  });

  it('does not update when paused', () => {
    const myStore = createPauseableStore(rootStore, {
      isPaused: true,
    });

    rootStore.dispatch(incrementAction());
    expect(myStore.getState()).toEqual({
      count: 0,
    });

    rootStore.dispatch(incrementAction());
    expect(myStore.getState()).toEqual({
      count: 0,
    });
  });

  it('pauses and then unpauses', () => {
    const myStore = createPauseableStore(rootStore);

    rootStore.dispatch(incrementAction());
    expect(myStore.getState()).toEqual({
      count: 1,
    });

    myStore.setPaused(true);

    rootStore.dispatch(incrementAction());
    rootStore.dispatch(incrementAction());
    expect(myStore.getState()).toEqual({
      count: 1,
    });

    myStore.setPaused(false);

    expect(myStore.getState()).toEqual({
      count: 3,
    });
  });

  it('unpauses and then repauses', () => {
    const myStore = createPauseableStore(rootStore, {
      isPaused: true,
    });

    rootStore.dispatch(incrementAction());
    rootStore.dispatch(incrementAction());
    expect(myStore.getState()).toEqual({
      count: 0,
    });

    myStore.setPaused(false);

    expect(myStore.getState()).toEqual({
      count: 2,
    });

    rootStore.dispatch(incrementAction());
    expect(myStore.getState()).toEqual({
      count: 3,
    });

    myStore.setPaused(true);

    rootStore.dispatch(incrementAction());
    rootStore.dispatch(incrementAction());
    expect(myStore.getState()).toEqual({
      count: 3,
    });
  });
});
