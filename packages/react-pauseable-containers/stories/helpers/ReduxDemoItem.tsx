import React from 'react';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';

import { RenderCount, useCountSelector } from 'react-hibernate-dev-helpers';

const ReduxDemoItem: React.FC = () => {
  const count = useCountSelector();

  return (
    <Typography variant="body1" component="div">
      count: <Chip label={count} />
      <RenderCount />
    </Typography>
  );
};

export { ReduxDemoItem };
