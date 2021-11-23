/* eslint-env jest */
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';

import { PauseableComponentContainer } from '.';

describe('PauseableComponentContainer', () => {
  it('allows updates', () => {
    const { rerender } = render(
      <PauseableComponentContainer shouldUpdate={true}>First render</PauseableComponentContainer>,
    );

    expect(screen.queryByText('First render')).toBeInTheDocument();

    rerender(
      <PauseableComponentContainer shouldUpdate={true}>Second render</PauseableComponentContainer>,
    );

    expect(screen.queryByText('First render')).not.toBeInTheDocument();
    expect(screen.queryByText('Second render')).toBeInTheDocument();
  });

  it('prevents updates', () => {
    const { rerender } = render(
      <PauseableComponentContainer shouldUpdate={false}>First render</PauseableComponentContainer>,
    );

    expect(screen.queryByText('First render')).toBeInTheDocument();

    rerender(
      <PauseableComponentContainer shouldUpdate={false}>Second render</PauseableComponentContainer>,
    );

    expect(screen.queryByText('First render')).toBeInTheDocument();
    expect(screen.queryByText('Second render')).not.toBeInTheDocument();
  });
});
