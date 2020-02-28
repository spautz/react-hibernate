import React, { ReactElement, ReactNode } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MemoryRouter, Redirect, Route, RouteProps } from 'react-router';
import { NavLink } from 'react-router-dom';

import { HibernatingRoute, HibernatingSwitch } from '../src';

import { SampleForm, SampleFormProps } from '../helpers/components';
import { reduxDecorator, countAction } from '../helpers/redux';
import StaticReduxContainer from '../src/StaticContainers/StaticReduxContainer';

const SampleWithRedux: React.FC<SampleFormProps> = (props: SampleFormProps) => {
  const state = useSelector((state) => state);
  console.log('state = ', state);
  const dispatch = useDispatch();

  return (
    <div>
      <SampleForm {...props}>
        <button
          onClick={(): void => {
            dispatch(countAction());
          }}
        >
          Increment Redux count
        </button>
        <pre>{JSON.stringify(state, null, 2)}</pre>
      </SampleForm>
    </div>
  );
};

export default {
  title: 'With Redux',
  component: HibernatingSwitch,
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

    <HibernatingSwitch StaticWrapper={null}>
      <HibernatingRoute path="/route1">
        <SampleWithRedux title="Route 1" />
      </HibernatingRoute>
      <HibernatingRoute path="/route2">
        <SampleWithRedux title="Route 2" />
      </HibernatingRoute>
      <HibernatingRoute path="/route3/:id">
        <SampleWithRedux title="Route 3" />
      </HibernatingRoute>
    </HibernatingSwitch>
  </MemoryRouter>
);

export const WithDefaultWrapper = (): ReactNode => (
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

    <HibernatingSwitch>
      <HibernatingRoute path="/route1">
        <SampleWithRedux title="Route 1" />
      </HibernatingRoute>
      <HibernatingRoute path="/route2">
        <SampleWithRedux title="Route 2" />
      </HibernatingRoute>
      <HibernatingRoute path="/route3/:id">
        <SampleWithRedux title="Route 3" />
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

    <HibernatingSwitch StaticWrapper={StaticReduxContainer}>
      <HibernatingRoute path="/route1">
        <SampleWithRedux title="Route 1" />
      </HibernatingRoute>
      <HibernatingRoute path="/route2">
        <SampleWithRedux title="Route 2" />
      </HibernatingRoute>
      <HibernatingRoute path="/route3/:id">
        <SampleWithRedux title="Route 3" />
      </HibernatingRoute>
    </HibernatingSwitch>
  </MemoryRouter>
);

const MyCustomRoute = (props: RouteProps): ReactElement => <Route {...props} />;

export const MixRoutesWithStaticWrapper = (): ReactNode => (
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

    <HibernatingSwitch StaticWrapper={StaticReduxContainer}>
      <Route path="/route1">
        <SampleWithRedux title="Route 1" />
      </Route>
      <MyCustomRoute path="/route2">
        <SampleWithRedux title="Route 2" />
      </MyCustomRoute>
      <HibernatingRoute path="/route3/:id">
        <SampleWithRedux title="Route 3" />
      </HibernatingRoute>
      <Redirect to="/route1" />
    </HibernatingSwitch>
  </MemoryRouter>
);
