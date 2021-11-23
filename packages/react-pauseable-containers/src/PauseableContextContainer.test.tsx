/* eslint-env jest */
import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { render, screen } from '@testing-library/react';

import { PauseableContextContainer } from '.';
import { Context, useContext } from 'react';

describe('PauseableContextContainer', () => {
  let TestContext: Context<string>;
  let TestConsumer: React.FC;
  beforeEach(() => {
    TestContext = React.createContext('default');
    TestConsumer = function TestConsumer() {
      const valueFromContext = useContext(TestContext);
      return <span>{valueFromContext}</span>;
    };
  });

  it('allows updates', () => {
    const { rerender } = render(
      <TestContext.Provider value="one">
        <PauseableContextContainer Context={TestContext} shouldUpdate={true}>
          <TestConsumer />
        </PauseableContextContainer>
      </TestContext.Provider>,
    );

    expect(screen.queryByText('one')).toBeInTheDocument();

    // "one" -> "two"
    rerender(
      <TestContext.Provider value="two">
        <PauseableContextContainer Context={TestContext} shouldUpdate={true}>
          <TestConsumer />
        </PauseableContextContainer>
      </TestContext.Provider>,
    );

    expect(screen.queryByText('one')).not.toBeInTheDocument();
    expect(screen.queryByText('two')).toBeInTheDocument();
  });

  it('prevents updates', () => {
    const { rerender } = render(
      <TestContext.Provider value="one">
        <PauseableContextContainer Context={TestContext} shouldUpdate={false}>
          <TestConsumer />
        </PauseableContextContainer>
      </TestContext.Provider>,
    );

    expect(screen.queryByText('one')).toBeInTheDocument();

    // "one" -> "two"
    rerender(
      <TestContext.Provider value="two">
        <PauseableContextContainer Context={TestContext} shouldUpdate={false}>
          <TestConsumer />
        </PauseableContextContainer>
      </TestContext.Provider>,
    );

    expect(screen.queryByText('one')).toBeInTheDocument();
    expect(screen.queryByText('two')).not.toBeInTheDocument();
  });
});
