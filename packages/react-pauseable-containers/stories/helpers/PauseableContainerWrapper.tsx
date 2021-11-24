import { ReactComponentLike } from 'prop-types';
import React, { useState } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Paper from '@material-ui/core/Paper';

export interface PauseableContainerWrapperProps {
  PauseableContainer: ReactComponentLike;
  initialState?: boolean;
  [unrecognizedProp: string]: unknown;
}

/**
 * Provides a standard interface for demoing the shouldUpdateprop
 */
const PauseableContainerWrapper: React.FC<PauseableContainerWrapperProps> = (props) => {
  const { PauseableContainer, children, initialState = true, ...allOtherProps } = props;

  const [shouldUpdate, setShouldUpdate] = useState(initialState);

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
        <PauseableContainer shouldUpdate={shouldUpdate} {...allOtherProps}>
          {children}
        </PauseableContainer>
      </div>
    </Paper>
  );
};

export { PauseableContainerWrapper };
