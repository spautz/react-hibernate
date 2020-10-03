import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';

import { incrementAction, useStateSelector } from 'react-hibernate-dev-helpers';

const ReduxStateDisplay: React.FC = () => {
  const dispatch = useDispatch();
  const reduxState = useStateSelector();

  const increment = useCallback(() => dispatch(incrementAction()), [dispatch]);

  return (
    <>
      <Button onClick={increment} variant="contained">
        Increment
      </Button>
      <div>
        Redux state:
        <pre>
          <code>{JSON.stringify(reduxState, null, 2)}</code>
        </pre>
      </div>
    </>
  );
};

export default ReduxStateDisplay;
