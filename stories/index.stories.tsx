import * as React from 'react';
import { ReactElement, ReactNode } from 'react';
import { MemoryRouter, Redirect, Route, RouteProps } from 'react-router';
import { NavLink } from 'react-router-dom';

import { HibernatingRoute, HibernatingSwitch } from '../src';

import SampleForm from '../util/components/SampleForm';

export default {
  title: 'maxCacheSize stories',
  component: HibernatingSwitch,
};

export const MaxCacheTimeOneMinute = (): ReactNode => (
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

    <HibernatingSwitch maxCacheSize={-1} maxCacheTime={60 * 1000}>
      <HibernatingRoute path="/route1">
        <SampleForm title="Route 1" />
      </HibernatingRoute>
      <HibernatingRoute path="/route2">
        <SampleForm title="Route 2" />
      </HibernatingRoute>
      <HibernatingRoute path="/route3/:id">
        <SampleForm title="Route 3" />
      </HibernatingRoute>
    </HibernatingSwitch>
  </MemoryRouter>
);

export const MaxCacheSizeOne = (): ReactNode => (
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

    <HibernatingSwitch maxCacheSize={2} maxCacheTime={-1}>
      <HibernatingRoute path="/route1">
        <SampleForm title="Route 1" />
      </HibernatingRoute>
      <HibernatingRoute path="/route2">
        <SampleForm title="Route 2" />
      </HibernatingRoute>
      <HibernatingRoute path="/route3/:id">
        <SampleForm title="Route 3" />
      </HibernatingRoute>
    </HibernatingSwitch>
  </MemoryRouter>
);

const MyCustomRoute = (props: RouteProps): ReactElement => <Route {...props} />;

export const MixRoutesAndHibernatingRoutes = (): ReactNode => (
  <MemoryRouter initialEntries={['/not-matched']}>
    <NavLink to="/route1">Default Route</NavLink>
    {' | '}
    <NavLink to="/route2">Custom Route</NavLink>
    {' | '}
    <NavLink to="/route3/1">Hibernating id=1</NavLink>
    {' | '}
    <NavLink to="/route3/2">Hibernating id=2</NavLink>
    {' | '}
    <NavLink to="/route3/3">Hibernating id=3</NavLink>

    <HibernatingSwitch maxCacheSize={0} maxCacheTime={0}>
      <Route path="/route1">
        <SampleForm title="Route 1" />
      </Route>
      <MyCustomRoute path="/route2">
        <SampleForm title="Route 2" />
      </MyCustomRoute>
      <HibernatingRoute path="/route3/:id">
        <SampleForm title="Route 3" />
      </HibernatingRoute>
      <Redirect to="/route1" />
    </HibernatingSwitch>
  </MemoryRouter>
);
