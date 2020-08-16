import * as React from 'react';
import { ReactElement, ReactNode } from 'react';
import { MemoryRouter, Redirect, Route, RouteProps } from 'react-router';
import { NavLink } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import { action } from '@storybook/addon-actions';

import 'typeface-roboto';

import { DemoContainer } from 'react-hibernate-dev-helpers';

import { HibernatingRoute, HibernatingSwitch, HibernatingSwitchProps } from '../src';

export default {
  title: 'React Router Hibernate',
  component: HibernatingSwitch,
  decorators: [],
  parameters: {
    options: {
      showPanel: true,
    },
  },
};

const storyArgTypes = {
  maxCacheSize: { control: { type: 'range', min: 0, max: 10, step: 1 } },
  maxCacheTime: { control: { type: 'range', min: 0, max: 600 * 1000, step: 1000 } },
  WrapperComponent: { control: { disable: true } },
};

const logMountAction = action('mount');
const logUnmountAction = action('unmount');

// maxCacheTime: starts with an infinite cache size and a short cache time

export const MaxCacheTimeStory = (args: HibernatingSwitchProps): ReactNode => {
  const { maxCacheSize, maxCacheTime } = args;

  return (
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
        After leaving a screen, its state will be retained for ten seconds. Use the maxCacheTime
        control to set any time up to ten minutes.
      </Typography>

      <HibernatingSwitch maxCacheSize={maxCacheSize} maxCacheTime={maxCacheTime}>
        <HibernatingRoute path="/route1">
          <DemoContainer title="Route 1" onMount={logMountAction} onUnmount={logUnmountAction} />
        </HibernatingRoute>
        <HibernatingRoute path="/route2">
          <DemoContainer title="Route 2" onMount={logMountAction} onUnmount={logUnmountAction} />
        </HibernatingRoute>
        <HibernatingRoute path="/route3/:id">
          <DemoContainer title="Route 3" onMount={logMountAction} onUnmount={logUnmountAction} />
        </HibernatingRoute>
      </HibernatingSwitch>
    </MemoryRouter>
  );
};
MaxCacheTimeStory.storyName = 'maxCacheTime';
MaxCacheTimeStory.args = {
  maxCacheSize: 0,
  maxCacheTime: 10 * 1000,
};
MaxCacheTimeStory.argTypes = storyArgTypes;

// maxCacheTime: starts with a cache size of 1 and an infinite cache time

export const MaxCacheSizeStory = (args: HibernatingSwitchProps): ReactNode => {
  const { maxCacheSize, maxCacheTime } = args;

  return (
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
        Only the last screen you visited will be retained. Use the maxCacheSize control to set the
        number of screens to retain.
      </Typography>

      <HibernatingSwitch maxCacheSize={maxCacheSize} maxCacheTime={maxCacheTime}>
        <HibernatingRoute path="/route1">
          <DemoContainer title="Route 1" onMount={logMountAction} onUnmount={logUnmountAction} />
        </HibernatingRoute>
        <HibernatingRoute path="/route2">
          <DemoContainer title="Route 2" onMount={logMountAction} onUnmount={logUnmountAction} />
        </HibernatingRoute>
        <HibernatingRoute path="/route3/:id">
          <DemoContainer title="Route 3" onMount={logMountAction} onUnmount={logUnmountAction} />
        </HibernatingRoute>
      </HibernatingSwitch>
    </MemoryRouter>
  );
};
MaxCacheSizeStory.storyName = 'maxCacheSize';
MaxCacheSizeStory.args = {
  maxCacheSize: 1,
  maxCacheTime: 0,
};
MaxCacheSizeStory.argTypes = storyArgTypes;

// Mix and match

const MyCustomRoute = (props: RouteProps): ReactElement => <Route {...props} />;

export const MixedRouteTypesStory = (args: HibernatingSwitchProps): ReactNode => {
  const { maxCacheSize, maxCacheTime } = args;

  return (
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
        The first two screens are never hibernated/restored, the last three are. Use the controld to
        adjust settings.
      </Typography>

      <HibernatingSwitch maxCacheSize={maxCacheSize} maxCacheTime={maxCacheTime}>
        <Route path="/route1">
          <DemoContainer title="Route 1" onMount={logMountAction} onUnmount={logUnmountAction} />
        </Route>
        <MyCustomRoute path="/route2">
          <DemoContainer title="Route 2" onMount={logMountAction} onUnmount={logUnmountAction} />
        </MyCustomRoute>
        <HibernatingRoute path="/route3/:id">
          <DemoContainer title="Route 3" onMount={logMountAction} onUnmount={logUnmountAction} />
        </HibernatingRoute>
        <Redirect to="/route1" />
      </HibernatingSwitch>
    </MemoryRouter>
  );
};
MixedRouteTypesStory.storyName = 'Mixed route types';
MixedRouteTypesStory.args = {
  maxCacheSize: 5,
  maxCacheTime: 60 * 1000,
};
MixedRouteTypesStory.argTypes = storyArgTypes;
