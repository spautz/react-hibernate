import PropTypes from 'prop-types';
import React, { useState } from 'react';

import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import { RenderCount } from 'react-hibernate-dev-helpers';

import { PauseableComponentContainer } from '../src';

export interface PauseableComponentItemProps {
  count: number;
}

const PauseableComponentItem: React.FC<PauseableComponentItemProps> = (props) => {
  const { count } = props;

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
        <PauseableComponentContainer shouldUpdate={shouldUpdate}>
          <Typography variant="body1">
            count: <Chip label={count} />
          </Typography>
          <RenderCount />
        </PauseableComponentContainer>
      </div>
    </Paper>
  );
};

PauseableComponentItem.propTypes = {
  count: PropTypes.number.isRequired,
};

export default PauseableComponentItem;
