/* eslint-env jest */
import '@testing-library/jest-dom/extend-expect';
import * as React from 'react';
import { Route } from 'react-router';
import { Link } from 'react-router-dom';
import { fireEvent, screen } from '@testing-library/react';

import HibernatingRoute from '../src/HibernatingRoute';
import HibernatingSwitch from '../src/HibernatingSwitch';

import {
  restoreReactUnmountErrors,
  suppressReactUnmountErrors,
  renderWithRouterContext,
} from '../../../helpers/test';

describe('Compatibility with react-router components', () => {
  // We only suppress the unmount errors between tests: if they happen within any test, we want to know
  beforeEach(() => {
    restoreReactUnmountErrors();
  });

  afterEach(() => {
    suppressReactUnmountErrors();
  });

  afterAll(() => {
    restoreReactUnmountErrors();
  });

  describe('HibernatingRoute', () => {
    it('warns when used standalone', () => {
      // We warn once for the direct use of HibernatingRoute
      const consoleWarnSpy = jest.spyOn(global.console, 'warn').mockImplementationOnce(() => null);

      renderWithRouterContext(<HibernatingRoute>Children here</HibernatingRoute>);

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

  describe('HibernatingSwitch renders like a plain Switch', () => {
    it('with a single Route', () => {
      renderWithRouterContext(
        <HibernatingSwitch>
          <Route>Children here</Route>
        </HibernatingSwitch>,
      );

      expect(screen.queryByText('Children here')).toBeInTheDocument();
    });

    it('with a single HibernatingRoute', () => {
      renderWithRouterContext(
        <HibernatingSwitch>
          <HibernatingRoute>Children here</HibernatingRoute>
        </HibernatingSwitch>,
      );

      expect(screen.queryByText('Children here')).toBeInTheDocument();
    });

    it('with two Routes', () => {
      renderWithRouterContext(
        <HibernatingSwitch>
          <Route path="/not-matched">Children 1 here</Route>
          <Route>Children 2 here</Route>
        </HibernatingSwitch>,
      );

      expect(screen.queryByText('Children 2 here')).toBeInTheDocument();
      expect(screen.queryByText('Children 1 here')).not.toBeInTheDocument();
    });

    it('with two HibernatingRoutes', () => {
      renderWithRouterContext(
        <HibernatingSwitch>
          <HibernatingRoute path="/not-matched">Children 1 here</HibernatingRoute>
          <HibernatingRoute>Children 2 here</HibernatingRoute>
        </HibernatingSwitch>,
      );

      expect(screen.queryByText('Children 2 here')).toBeInTheDocument();
      expect(screen.queryByText('Children 1 here')).not.toBeInTheDocument();
    });
  });

  describe('HibernatingSwitch can navigate', () => {
    const cases = [
      { itLabel: 'between two Routes', Component1: Route, Component2: Route },
      {
        itLabel: 'between two HibernatingRoutes',
        Component1: HibernatingRoute,
        Component2: HibernatingRoute,
      },
      {
        itLabel: 'between Route and HibernatingRoute',
        Component1: Route,
        Component2: HibernatingRoute,
      },
      {
        itLabel: 'between HibernatingRoute and Route',
        Component1: HibernatingRoute,
        Component2: Route,
      },
    ];

    cases.forEach(({ itLabel, Component1, Component2 }) => {
      it(itLabel, () => {
        renderWithRouterContext(
          () => (
            <>
              <HibernatingSwitch>
                <Component1 path="/one">Children 1 here</Component1>
                <Component2 path="/two">Children 2 here</Component2>
              </HibernatingSwitch>

              <Link data-testid="link-one" to="/one">
                Goto 1
              </Link>
              <Link data-testid="link-two" to="/two">
                Goto 2
              </Link>
            </>
          ),
          { initialEntries: ['/one'] },
        );

        expect(screen.queryByText('Children 1 here')).toBeInTheDocument();
        expect(screen.queryByText('Children 2 here')).not.toBeInTheDocument();

        fireEvent.click(screen.getByTestId('link-two'));

        expect(screen.queryByText('Children 1 here')).not.toBeInTheDocument();
        expect(screen.queryByText('Children 2 here')).toBeInTheDocument();

        fireEvent.click(screen.getByTestId('link-one'));

        expect(screen.queryByText('Children 1 here')).toBeInTheDocument();
        expect(screen.queryByText('Children 2 here')).not.toBeInTheDocument();
      });
    });
  });
});
