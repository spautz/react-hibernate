import React, { useCallback, useState } from 'react';

import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';

import 'typeface-roboto';

import { reduxDecorator } from 'react-hibernate-dev-helpers';

import {
  PauseableContainerWrapper,
  ComponentDemoItem,
  ContextDemoItem,
  DemoContext,
  ReduxDemoItem,
  ReduxStateDisplay,
} from './helpers';
import {
  PauseableComponentContainer,
  PauseableContextContainer,
  PauseableReduxContainer,
} from '../src';

export default {
  title: 'React Pauseable Containers',
  decorators: [],
  parameters: {
    options: {
      showPanel: false,
    },
  },
};

/* PauseableComponentContainer
 * Set/update state in parent and pass it down to children via props
 */

export const PauseableComponentContainerStory = () => {
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

      <PauseableContainerWrapper PauseableContainer={PauseableComponentContainer}>
        <ComponentDemoItem count={count} />
      </PauseableContainerWrapper>
      <PauseableContainerWrapper PauseableContainer={PauseableComponentContainer}>
        <ComponentDemoItem count={count} />
      </PauseableContainerWrapper>
      <PauseableContainerWrapper
        PauseableContainer={PauseableComponentContainer}
        initialState={false}
      >
        <ComponentDemoItem count={count} />
      </PauseableContainerWrapper>
    </div>
  );
};
PauseableComponentContainerStory.storyName = 'PauseableComponentContainer';

/* PauseableContextContainer
 * Set/update state in parent and pass it down to children via context
 */

export const PauseableContextContainerStory = () => {
  const [count, setCount] = useState(0);

  const increment = useCallback(() => setCount((n) => n + 1), []);

  return (
    <DemoContext.Provider value={count}>
      <div>
        <Typography variant="h4">
          <code>&lt;PauseableContextContainer&gt;</code>
        </Typography>
        <Typography variant="subtitle1">
          The <code>count</code> value is put into a context, which each child reads from.
        </Typography>
        <Typography variant="subtitle1">
          Each child is wrapped in a <code>PauseableContextContainer</code> whose{' '}
          <code>shouldUpdate</code> prop is controlled by the checkbox.
        </Typography>
        <Button onClick={increment} variant="contained">
          Increment
        </Button>

        <div>
          Value in context:
          <Chip label={count} />
        </div>

        <PauseableContainerWrapper
          PauseableContainer={PauseableContextContainer}
          Context={DemoContext}
        >
          <ContextDemoItem />
        </PauseableContainerWrapper>
        <PauseableContainerWrapper
          PauseableContainer={PauseableContextContainer}
          Context={DemoContext}
        >
          <ContextDemoItem />
        </PauseableContainerWrapper>
        <PauseableContainerWrapper
          PauseableContainer={PauseableContextContainer}
          Context={DemoContext}
          initialState={false}
        >
          <ContextDemoItem />
        </PauseableContainerWrapper>
      </div>
    </DemoContext.Provider>
  );
};
PauseableContextContainerStory.storyName = 'PauseableContextContainer';

/* PauseableComponentContainer
 * One control sets and displays Redux state, each child reads from Redux.
 */

export const PauseableReduxContainerStory = () => {
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

      <ReduxStateDisplay />

      <PauseableContainerWrapper PauseableContainer={PauseableReduxContainer}>
        <ReduxDemoItem />
      </PauseableContainerWrapper>
      <PauseableContainerWrapper PauseableContainer={PauseableReduxContainer}>
        <ReduxDemoItem />
      </PauseableContainerWrapper>
      <PauseableContainerWrapper PauseableContainer={PauseableReduxContainer} initialState={false}>
        <ReduxDemoItem />
      </PauseableContainerWrapper>
    </div>
  );
};
PauseableReduxContainerStory.storyName = 'PauseableReduxContainer';
PauseableReduxContainerStory.decorators = [reduxDecorator];

// @TODO: A story where the PauseableReduxItems can dispatch actions
// const dispatchWhenPaused = boolean('Allow dispatches from paused children', false);
