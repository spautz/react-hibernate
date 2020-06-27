/* eslint-env jest */
// import '@testing-library/jest-dom/extend-expect';
import { Store } from 'redux';

import { createDevHelperStore, incrementAction } from 'react-hibernate-dev-helpers';

import { createPauseableStore } from '../src';

describe('getState', () => {
  describe('from parent store', () => {
    let parentStore: Store;
    beforeEach(() => {
      parentStore = createDevHelperStore();
    });

    it('creates a pauseableStore', () => {
      const pauseableStore = createPauseableStore(parentStore);

      expect(pauseableStore.getState()).toEqual({
        count: 0,
      });
    });

    it('updates when not paused', () => {
      const pauseableStore = createPauseableStore(parentStore);

      parentStore.dispatch(incrementAction());
      expect(pauseableStore.getState()).toEqual({
        count: 1,
      });

      parentStore.dispatch(incrementAction());
      expect(pauseableStore.getState()).toEqual({
        count: 2,
      });
    });

    it('does not update when paused', () => {
      const pauseableStore = createPauseableStore(parentStore, { isPaused: true });

      parentStore.dispatch(incrementAction());
      expect(pauseableStore.getState()).toEqual({
        count: 0,
      });

      parentStore.dispatch(incrementAction());
      expect(pauseableStore.getState()).toEqual({
        count: 0,
      });
    });
  });
});
