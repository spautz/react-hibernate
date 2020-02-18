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
    <NavLink to="/form1">One</NavLink>
    <NavLink to="/form2">Two</NavLink>
    <NavLink to="/form3">Three</NavLink>

    <HibernatingSwitch maxCacheTime={60 * 1000}>
      <HibernatingRoute path="/form1">
        <SampleForm title="One" />
      </HibernatingRoute>
      <HibernatingRoute path="/form2">
        <SampleForm title="Two" />
      </HibernatingRoute>
      <HibernatingRoute>
        <SampleForm title="Three" />
      </HibernatingRoute>
    </HibernatingSwitch>
  </MemoryRouter>
);

export const MaxCacheSizeOne = (): ReactNode => (
  <MemoryRouter initialEntries={['/form1']}>
    <NavLink to="/form1">One</NavLink>
    <NavLink to="/form2">Two</NavLink>
    <NavLink to="/form3">Three</NavLink>

    <HibernatingSwitch maxCacheSize={2}>
      <HibernatingRoute path="/form1">
        <SampleForm title="One" />
      </HibernatingRoute>
      <HibernatingRoute path="/form2">
        <SampleForm title="Two" />
      </HibernatingRoute>
      <HibernatingRoute>
        <SampleForm title="Three" />
      </HibernatingRoute>
    </HibernatingSwitch>
  </MemoryRouter>
);

export const SaveEverythingForever = (): ReactNode => (
  <MemoryRouter initialEntries={['/form1']}>
    <NavLink to="/form1">One</NavLink>
    <NavLink to="/form2">Two</NavLink>
    <NavLink to="/form3">Three</NavLink>

    <HibernatingSwitch
      maxCacheSize={Number.MAX_SAFE_INTEGER}
      maxCacheTime={Number.MAX_SAFE_INTEGER}
    >
      <HibernatingRoute path="/form1">
        <SampleForm title="One" />
      </HibernatingRoute>
      <HibernatingRoute path="/form2">
        <SampleForm title="Two" />
      </HibernatingRoute>
      <HibernatingRoute>
        <SampleForm title="Three" />
      </HibernatingRoute>
    </HibernatingSwitch>
  </MemoryRouter>
);
