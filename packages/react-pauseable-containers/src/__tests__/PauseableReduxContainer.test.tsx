/* eslint-env jest */
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { screen } from '@testing-library/react';

import {
  createDevHelperStore,
  incrementAction,
  renderWithReduxContext,
  useCountSelector,
} from 'react-hibernate-dev-helpers';

import { PauseableReduxContainer } from '../PauseableReduxContainer';
import { act } from 'react-dom/test-utils';

const CountDisplay: React.FC = () => {
  const count = useCountSelector();
  return <div>count = {count}</div>;
};

describe('PauseableReduxContainer', () => {
  it('allows updates', () => {
    const myStore = createDevHelperStore();

    renderWithReduxContext(
      <PauseableReduxContainer shouldUpdate={true}>
        <CountDisplay />
      </PauseableReduxContainer>,
      myStore,
    );

    expect(screen.queryByText('count = 0')).toBeInTheDocument();

    act(() => {
      myStore.dispatch(incrementAction());
    });

    expect(screen.queryByText('count = 1')).toBeInTheDocument();
  });

  it('prevents updates', () => {
    const myStore = createDevHelperStore();

    renderWithReduxContext(
      <PauseableReduxContainer shouldUpdate={false}>
        <CountDisplay />
      </PauseableReduxContainer>,
      myStore,
    );

    expect(screen.queryByText('count = 0')).toBeInTheDocument();

    act(() => {
      myStore.dispatch(incrementAction());
    });

    expect(screen.queryByText('count = 0')).toBeInTheDocument();
  });
});
