import * as React from 'react';
import { ReactElement, ReactNode } from 'react';
import { MemoryRouter, Redirect, Route, RouteProps } from 'react-router';
import { NavLink } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import { withKnobs, number } from '@storybook/addon-knobs';

import { DemoContainer } from 'dev-helpers';

import 'typeface-roboto';

import { HibernatingRoute, HibernatingSwitch } from '../src';

export default {
  title: 'Basic usage',
  component: HibernatingSwitch,
  decorators: [withKnobs],
};

export const MaxCacheTimeOneMinute = (): ReactNode => {
  const maxCacheSize = number('maxCacheSize', -1);
  const maxCacheTime = number('maxCacheTime', 60 * 1000);

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
        After leaving a screen, its state will be retained for one minute
      </Typography>

      <HibernatingSwitch maxCacheSize={maxCacheSize} maxCacheTime={maxCacheTime}>
        <HibernatingRoute path="/route1">
          <DemoContainer title="Route 1" />
        </HibernatingRoute>
        <HibernatingRoute path="/route2">
          <DemoContainer title="Route 2" />
        </HibernatingRoute>
        <HibernatingRoute path="/route3/:id">
          <DemoContainer title="Route 3" />
        </HibernatingRoute>
      </HibernatingSwitch>
    </MemoryRouter>
  );
};

export const MaxCacheSizeOne = (): ReactNode => {
  const maxCacheSize = number('maxCacheSize', 1);
  const maxCacheTime = number('maxCacheTime', -1);

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

      <Typography variant="subtitle1">Only the last screen you visited will be retained</Typography>

      <HibernatingSwitch maxCacheSize={maxCacheSize} maxCacheTime={maxCacheTime}>
        <HibernatingRoute path="/route1">
          <DemoContainer title="Route 1" />
        </HibernatingRoute>
        <HibernatingRoute path="/route2">
          <DemoContainer title="Route 2" />
        </HibernatingRoute>
        <HibernatingRoute path="/route3/:id">
          <DemoContainer title="Route 3" />
        </HibernatingRoute>
      </HibernatingSwitch>
    </MemoryRouter>
  );
};

const MyCustomRoute = (props: RouteProps): ReactElement => <Route {...props} />;

export const MixRoutesAndHibernatingRoutes = (): ReactNode => {
  const maxCacheSize = number('maxCacheSize', 0);
  const maxCacheTime = number('maxCacheTime', 0);

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
        The first two screens are never retained, the last three are
      </Typography>

      <HibernatingSwitch maxCacheSize={maxCacheSize} maxCacheTime={maxCacheTime}>
        <Route path="/route1">
          <DemoContainer title="Route 1" />
        </Route>
        <MyCustomRoute path="/route2">
          <DemoContainer title="Route 2" />
        </MyCustomRoute>
        <HibernatingRoute path="/route3/:id">
          <DemoContainer title="Route 3" />
        </HibernatingRoute>
        <Redirect to="/route1" />
      </HibernatingSwitch>
    </MemoryRouter>
  );
};
