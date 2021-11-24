import React, { useContext } from 'react';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';

import { RenderCount } from 'react-hibernate-dev-helpers';

const DemoContext = React.createContext(0);

const ContextDemoItem: React.FC = () => {
  const count = useContext(DemoContext);

  return (
    <Typography variant="body1" component="div">
      count: <Chip label={count} />
      <RenderCount />
    </Typography>
  );
};

export { ContextDemoItem, DemoContext };
