import React, { useState } from 'react';

import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

import { RenderCount, useCountSelector } from 'react-hibernate-dev-helpers';

import { PauseableReduxContainer } from '../src';

const PauseableReduxItem: React.FC = () => {
  const count = useCountSelector();

  const [shouldUpdate, setShouldUpdate] = useState(true);

  return (
    <Paper style={{ marginTop: 10, padding: 5 }}>
      <FormControlLabel
        control={
          <Checkbox
            checked={shouldUpdate}
            onChange={(event) => setShouldUpdate(event.target.checked)}
          />
        }
        label="shouldUpdate"
      />
      <div>
        <PauseableReduxContainer shouldUpdate={shouldUpdate}>
          <Typography variant="body1">
            count: <Chip label={count} />
          </Typography>
          <RenderCount />
        </PauseableReduxContainer>
      </div>
    </Paper>
  );
};

export default PauseableReduxItem;
