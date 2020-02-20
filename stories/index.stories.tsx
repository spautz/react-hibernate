import * as React from 'react';
import { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';

import { HibernatingRoute, HibernatingSwitch } from '../src';

import SampleForm from './components/SampleForm';
import { MemoryRouter } from 'react-router';

export default {
  title: 'maxCacheSize stories',
  component: HibernatingSwitch,
};

export const MaxCacheTimeOneMinute = (): ReactNode => (
  <MemoryRouter initialEntries={['/form1']}>
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
  <MemoryRouter initialEntries={['/form1']}>
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

export const SaveEverythingForever = (): ReactNode => (
  <MemoryRouter initialEntries={['/form1']}>
    <NavLink to="/route1">Route1</NavLink>
    {' | '}
    <NavLink to="/route2">Route2</NavLink>
    {' | '}
    <NavLink to="/route3/1">Route3 id=1</NavLink>
    {' | '}
    <NavLink to="/route3/2">Route3 id=2</NavLink>
    {' | '}
    <NavLink to="/route3/3">Route3 id=3</NavLink>

    <HibernatingSwitch maxCacheSize={0} maxCacheTime={0}>
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
