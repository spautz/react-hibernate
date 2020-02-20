/* eslint-env jest */
import '@testing-library/jest-dom/extend-expect';
import * as React from 'react';
import { MemoryRouter, Route } from 'react-router';
import { render, screen } from '@testing-library/react';

import HibernatingSwitch from '../../src/HibernatingSwitch';
import HibernatingRoute from '../../src/HibernatingRoute';

describe('HibernatingSwitch', () => {
  describe('without a HibernatingRoute', () => {
    it('acts like a plain Switch with a Route', () => {
      render(
        <MemoryRouter>
          <HibernatingSwitch>
            <Route>Children here</Route>
          </HibernatingSwitch>
        </MemoryRouter>,
      );

      expect(screen.queryByText('Children here')).toBeInTheDocument();
    });

    it('acts like a plain Switch with multiple Routes', () => {
      render(
        <MemoryRouter>
          <HibernatingSwitch>
            <Route path="/not-matched">Children 1 here</Route>
            <Route>Children 2 here</Route>
          </HibernatingSwitch>
        </MemoryRouter>,
      );

      expect(screen.queryByText('Children 2 here')).toBeInTheDocument();
    });
  });

  describe('with a HibernatingRoute', () => {
    it('hibernates when using HibernatingRoute', () => {
      render(
        <MemoryRouter>
          <HibernatingSwitch>
            <HibernatingRoute path="/not-matched">Children 1 here</HibernatingRoute>
            <HibernatingRoute>Children 2 here</HibernatingRoute>
          </HibernatingSwitch>
        </MemoryRouter>,
      );

      expect(screen.queryByText('Children 2 here')).toBeInTheDocument();
    });
  });
});
