import PropTypes from 'prop-types';
import React, { useState } from 'react';

import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

import { RenderCount, useCountSelector } from 'react-hibernate-dev-helpers';

import { PauseableComponentContainer, PauseableReduxContainer } from '../src';

interface PauseableReduxItemProps {
  dispatchWhenPaused?: boolean;
}

const PauseableReduxItem: React.FC<PauseableReduxItemProps> = (props) => {
  const { dispatchWhenPaused } = props;
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
      <PauseableComponentContainer shouldUpdate={shouldUpdate}>
        <PauseableReduxContainer
          shouldUpdate={shouldUpdate}
          dispatchWhenPaused={dispatchWhenPaused}
        >
          <Typography variant="body1" component="div">
            count: <Chip label={count} />
          </Typography>
          <RenderCount />
        </PauseableReduxContainer>
      </PauseableComponentContainer>
    </Paper>
  );
};

PauseableReduxItem.propTypes = {
  dispatchWhenPaused: PropTypes.bool,
};

PauseableReduxItem.defaultProps = {
  dispatchWhenPaused: false,
};

export default PauseableReduxItem;
