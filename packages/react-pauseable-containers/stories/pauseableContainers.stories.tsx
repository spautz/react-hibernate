import React, { ReactNode, useCallback, useState } from 'react';

import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';

import 'typeface-roboto';

import { reduxDecorator } from 'react-hibernate-dev-helpers';

import PauseableContainerItem from './PauseableContainerItem';

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
        The parent state includes a <code>count</code> variable which is passed to each child.
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
      <PauseableContainerItem count={count} />
      <PauseableContainerItem count={count} />
      <PauseableContainerItem count={count} />
    </div>
  );
};
PauseableComponentContainerStory.story = { name: 'PauseableComponentContainer' };
