/* eslint-env jest */
// import '@testing-library/jest-dom/extend-expect';
import { Store } from 'redux';

import { createDevHelperStore, incrementAction } from 'react-hibernate-dev-helpers';

import { createPauseableStore } from '../createPauseableStore';
import { PauseableStoreInstance } from '../types';

describe('getState with a chain of multiple parent stores', () => {
  let rootStore: Store;
  let grandparentStore: PauseableStoreInstance;
  let parentStore: PauseableStoreInstance;
  beforeEach(() => {
    rootStore = createDevHelperStore();
    grandparentStore = createPauseableStore(rootStore);
    parentStore = createPauseableStore(grandparentStore);
  });

  it('creates a pauseableStore', () => {
    const myStore = createPauseableStore(parentStore);

    expect(myStore.getState()).toEqual({
      count: 0,
    });
  });

  it('updates when not paused', () => {
    const myStore = createPauseableStore(parentStore);

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

  it('stops updates at grandparent when grandparent paused', () => {
    const myStore = createPauseableStore(parentStore);

    grandparentStore.setPaused(true);

    rootStore.dispatch(incrementAction());
    rootStore.dispatch(incrementAction());

    expect(rootStore.getState()).toEqual({
      count: 2,
    });
    expect(grandparentStore.getState()).toEqual({
      count: 0,
    });
    expect(parentStore.getState()).toEqual({
      count: 0,
    });
    expect(myStore.getState()).toEqual({
      count: 0,
    });
  });

  it('stops updates at parent when parent paused', () => {
    const myStore = createPauseableStore(parentStore);

    parentStore.setPaused(true);

    rootStore.dispatch(incrementAction());
    rootStore.dispatch(incrementAction());

    expect(rootStore.getState()).toEqual({
      count: 2,
    });
    expect(grandparentStore.getState()).toEqual({
      count: 2,
    });
    expect(parentStore.getState()).toEqual({
      count: 0,
    });
    expect(myStore.getState()).toEqual({
      count: 0,
    });
  });

  it('receives latest state properly when ancestors pause and unpause', () => {
    const myStore = createPauseableStore(parentStore);

    parentStore.setPaused(true);
    rootStore.dispatch(incrementAction());

    expect(rootStore.getState()).toEqual({
      count: 1,
    });
    expect(grandparentStore.getState()).toEqual({
      count: 1,
    });
    expect(parentStore.getState()).toEqual({
      count: 0,
    });
    expect(myStore.getState()).toEqual({
      count: 0,
    });

    grandparentStore.setPaused(true);
    rootStore.dispatch(incrementAction());

    expect(rootStore.getState()).toEqual({
      count: 2,
    });
    expect(grandparentStore.getState()).toEqual({
      count: 1,
    });
    expect(parentStore.getState()).toEqual({
      count: 0,
    });
    expect(myStore.getState()).toEqual({
      count: 0,
    });

    parentStore.setPaused(false);
    rootStore.dispatch(incrementAction());

    expect(rootStore.getState()).toEqual({
      count: 3,
    });
    expect(grandparentStore.getState()).toEqual({
      count: 1,
    });
    expect(parentStore.getState()).toEqual({
      count: 1,
    });
    expect(myStore.getState()).toEqual({
      count: 1,
    });

    myStore.setPaused(true);
    grandparentStore.setPaused(false);
    rootStore.dispatch(incrementAction());

    expect(rootStore.getState()).toEqual({
      count: 4,
    });
    expect(grandparentStore.getState()).toEqual({
      count: 4,
    });
    expect(parentStore.getState()).toEqual({
      count: 4,
    });
    expect(myStore.getState()).toEqual({
      count: 1,
    });

    myStore.setPaused(false);
    expect(myStore.getState()).toEqual({
      count: 4,
    });
  });
});
