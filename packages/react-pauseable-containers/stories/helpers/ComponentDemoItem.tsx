import React from 'react';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';

import { RenderCount } from 'react-hibernate-dev-helpers';

export interface PauseableComponentItemProps {
  count: number;
}

const ComponentDemoItem: React.FC<PauseableComponentItemProps> = (props) => {
  const { count } = props;

  return (
    <Typography variant="body1" component="div">
      count: <Chip label={count} />
      <RenderCount />
    </Typography>
  );
};

export { ComponentDemoItem };
