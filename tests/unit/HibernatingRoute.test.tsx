/* eslint-env jest */
import '@testing-library/jest-dom/extend-expect';
import * as React from 'react';
import { MemoryRouter } from 'react-router';
import { render, screen } from '@testing-library/react';

import HibernatingRoute from '../../src/HibernatingRoute';

describe('HibernatingRoute', () => {
  it('warns when used standalone', () => {
    // We warn once for the direct use of HibernatingRoute
    const consoleWarnSpy = jest.spyOn(global.console, 'warn').mockImplementationOnce(() => null);

    render(
      <MemoryRouter>
        <HibernatingRoute>Children here</HibernatingRoute>
      </MemoryRouter>,
    );

    expect(console.warn).toHaveBeenCalledTimes(1);
    expect(
      console.warn,
    ).toHaveBeenLastCalledWith(
      'HibernatingRoute is being used as a standalone component, instead of as a child of HibernatingSwitch. This will not do anything.',
      { children: 'Children here' },
    );
    consoleWarnSpy.mockRestore();

    expect(screen.queryByText('Children here')).toBeInTheDocument();
  });
});
