import * as React from 'react';
import { ReactNode } from 'react';
import { withKnobs } from '@storybook/addon-knobs';

import { DemoContainer } from 'react-hibernate-dev-helpers';

import { HibernationProvider, HibernatingSubtree } from '../src';

export default {
  title: 'Basic usage',
  component: HibernationProvider,
  decorators: [withKnobs],
};

export const Default = (): ReactNode => {
  const [component1Visible, setComponent1Visible] = React.useState(true);
  const [component2Visible, setComponent2Visible] = React.useState(true);
  const [component3Visible, setComponent3Visible] = React.useState(false);

  return (
    <HibernationProvider>
      <label>
        <input
          type="checkbox"
          checked={component1Visible}
          onChange={(e): void => {
            setComponent1Visible(e.target.checked);
          }}
        />
        DemoComponent 1
      </label>
      <label>
        <input
          type="checkbox"
          checked={component2Visible}
          onChange={(e): void => {
            setComponent2Visible(e.target.checked);
          }}
        />
        DemoComponent 2
      </label>
      <label>
        <input
          type="checkbox"
          checked={component3Visible}
          onChange={(e): void => {
            setComponent3Visible(e.target.checked);
          }}
        />
        DemoComponent 3
      </label>

      {component1Visible && (
        <HibernatingSubtree subtreeId="1">
          <DemoContainer title="DemoComponent 1" />
        </HibernatingSubtree>
      )}
      {component2Visible && (
        <HibernatingSubtree subtreeId="2">
          <DemoContainer title="DemoComponent 2" />
        </HibernatingSubtree>
      )}
      {component3Visible && (
        <HibernatingSubtree subtreeId="3">
          <DemoContainer title="DemoComponent 3" />
        </HibernatingSubtree>
      )}
    </HibernationProvider>
  );
};
