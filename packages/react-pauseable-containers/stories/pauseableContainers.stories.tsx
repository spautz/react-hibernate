import React, { ReactNode, useCallback, useState } from 'react';

import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';

import 'typeface-roboto';

import { reduxDecorator } from 'react-hibernate-dev-helpers';

import PauseableComponentItem from './PauseableComponentItem';
import PauseableReduxItem from './PauseableReduxItem';
import ReduxMonitor from './ReduxMonitor';

export default {
  title: 'React Pauseable Containers',
  decorators: [reduxDecorator],
};

export const PauseableComponentContainerStory = (): ReactNode => {
  const [count, setCount] = useState(0);

  const increment = useCallback(() => setCount((n) => n + 1), []);

  return (
    <div>
      <Typography variant="h4">
        <code>&lt;PauseableComponentContainer&gt;</code>
      </Typography>
      <Typography variant="subtitle1">
        The parent state has a <code>count</code>, which gets passed to each child.
      </Typography>
      <Typography variant="subtitle1">
        Each child is wrapped in a <code>PauseableComponentContainer</code> whose{' '}
        <code>shouldUpdate</code> prop is controlled by the checkbox.
      </Typography>
      <Button onClick={increment} variant="contained">
        Increment
      </Button>
      <div>
        Parent count:
        <Chip label={count} />
      </div>
      <PauseableComponentItem count={count} />
      <PauseableComponentItem count={count} />
      <PauseableComponentItem count={count} />
    </div>
  );
};
PauseableComponentContainerStory.storyName = 'PauseableComponentContainer';

const PauseableReduxContainerDemo = () => {
  return (
    <div>
      <Typography variant="h4">
        <code>&lt;PauseableReduxContainer&gt;</code>
      </Typography>
      <Typography variant="subtitle1">
        Redux state has a <code>count</code>, which each child displays.
      </Typography>
      <Typography variant="subtitle1">
        Each child is wrapped in a <code>PauseableReduxContainer</code> whose{' '}
        <code>shouldUpdate</code> prop is controlled by the checkbox.
      </Typography>

      <ReduxMonitor />

      <PauseableReduxItem />
      <PauseableReduxItem />
      <PauseableReduxItem />
    </div>
  );
};

export const PauseableReduxContainerStory = (): ReactNode => {
  return <PauseableReduxContainerDemo />;
};
PauseableReduxContainerStory.storyName = 'PauseableReduxContainer';
PauseableReduxContainerStory.decorators = [reduxDecorator];

// @TODO: A story where the PauseableReduxItems can dispatch actions
// const dispatchWhenPaused = boolean('Allow dispatches from paused children', false);
