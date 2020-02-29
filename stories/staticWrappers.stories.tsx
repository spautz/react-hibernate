import React, { ReactElement, ReactNode } from 'react';
import { MemoryRouter, Redirect, Route, RouteProps } from 'react-router';
import { NavLink } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';

import 'typeface-roboto';

import {
  HibernatingRoute,
  HibernatingSwitch,
  StaticReduxContainer,
  StaticComponentContainer,
} from '../packages/react-router-hibernate/src';

import { DemoContainer } from '../helpers/components';
import { reduxDecorator } from '../helpers/redux';

export default {
  title: 'Static Wrappers',
  decorators: [reduxDecorator],
};

export const WithNoWrapper = (): ReactNode => (
  <MemoryRouter initialEntries={['/route1']}>
    <NavLink to="/route1">Route1</NavLink>
    {' | '}
    <NavLink to="/route2">Route2</NavLink>
    {' | '}
    <NavLink to="/route3/1">Route3 id=1</NavLink>
    {' | '}
    <NavLink to="/route3/2">Route3 id=2</NavLink>
    {' | '}
    <NavLink to="/route3/3">Route3 id=3</NavLink>

    <Typography variant="subtitle1">
      With no StaticWrapper set, components will rerender when you return to them
    </Typography>

    <HibernatingSwitch StaticWrapper={null}>
      <HibernatingRoute path="/route1">
        <DemoContainer withRedux title="Route 1" />
      </HibernatingRoute>
      <HibernatingRoute path="/route2">
        <DemoContainer withRedux title="Route 2" />
      </HibernatingRoute>
      <HibernatingRoute path="/route3/:id">
        <DemoContainer withRedux title="Route 3" />
      </HibernatingRoute>
    </HibernatingSwitch>
  </MemoryRouter>
);

export const WithStaticWrapper = (): ReactNode => (
  <MemoryRouter initialEntries={['/route1']}>
    <NavLink to="/route1">Route1</NavLink>
    {' | '}
    <NavLink to="/route2">Route2</NavLink>
    {' | '}
    <NavLink to="/route3/1">Route3 id=1</NavLink>
    {' | '}
    <NavLink to="/route3/2">Route3 id=2</NavLink>
    {' | '}
    <NavLink to="/route3/3">Route3 id=3</NavLink>

    <Typography variant="subtitle1">
      With the StaticComponentContainer, components do not automatically rerender when you return to
      them
    </Typography>

    <HibernatingSwitch StaticWrapper={StaticComponentContainer}>
      <HibernatingRoute path="/route1">
        <DemoContainer withRedux title="Route 1" />
      </HibernatingRoute>
      <HibernatingRoute path="/route2">
        <DemoContainer withRedux title="Route 2" />
      </HibernatingRoute>
      <HibernatingRoute path="/route3/:id">
        <DemoContainer withRedux title="Route 3" />
      </HibernatingRoute>
    </HibernatingSwitch>
  </MemoryRouter>
);

export const WithReduxWrapper = (): ReactNode => (
  <MemoryRouter initialEntries={['/route1']}>
    <NavLink to="/route1">Route1</NavLink>
    {' | '}
    <NavLink to="/route2">Route2</NavLink>
    {' | '}
    <NavLink to="/route3/1">Route3 id=1</NavLink>
    {' | '}
    <NavLink to="/route3/2">Route3 id=2</NavLink>
    {' | '}
    <NavLink to="/route3/3">Route3 id=3</NavLink>

    <Typography variant="subtitle1">
      With the StaticReduxContainer, redux updates do not cause a rerender in hibernating routes.
      Due to the freezing/unfreezing of redux, however, the render count goes up by two when
      switching (once when entering hibernation, once when leaving it)
    </Typography>

    <HibernatingSwitch StaticWrapper={StaticReduxContainer}>
      <HibernatingRoute path="/route1">
        <DemoContainer withRedux title="Route 1" />
      </HibernatingRoute>
      <HibernatingRoute path="/route2">
        <DemoContainer withRedux title="Route 2" />
      </HibernatingRoute>
      <HibernatingRoute path="/route3/:id">
        <DemoContainer withRedux title="Route 3" />
      </HibernatingRoute>
    </HibernatingSwitch>
  </MemoryRouter>
);

const MyCustomRoute = (props: RouteProps): ReactElement => <Route {...props} />;

export const MixRoutesWithStaticWrapper = (): ReactNode => (
  <MemoryRouter initialEntries={['/not-matched']}>
    <NavLink to="/route1">Non-hibernating Route 1</NavLink>
    {' | '}
    <NavLink to="/route2">Non-hibernating Route 2</NavLink>
    {' | '}
    <NavLink to="/route3/1">Hibernating id=1</NavLink>
    {' | '}
    <NavLink to="/route3/2">Hibernating id=2</NavLink>
    {' | '}
    <NavLink to="/route3/3">Hibernating id=3</NavLink>

    <Typography variant="subtitle1">
      The first two screens are never retained, the last three are
    </Typography>

    <HibernatingSwitch StaticWrapper={StaticReduxContainer}>
      <Route path="/route1">
        <DemoContainer withRedux title="Route 1" />
      </Route>
      <MyCustomRoute path="/route2">
        <DemoContainer withRedux title="Route 2" />
      </MyCustomRoute>
      <HibernatingRoute path="/route3/:id">
        <DemoContainer withRedux title="Route 3" />
      </HibernatingRoute>
      <Redirect to="/route1" />
    </HibernatingSwitch>
  </MemoryRouter>
);
