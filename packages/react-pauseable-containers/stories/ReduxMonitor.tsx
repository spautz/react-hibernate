import React, { useCallback } from 'react';

import Chip from '@material-ui/core/Chip';

import { incrementAction, useCountSelector } from 'react-hibernate-dev-helpers';

import Button from '@material-ui/core/Button';
import { useDispatch } from 'react-redux';

const PauseableReduxItem: React.FC = () => {
  const dispatch = useDispatch();
  const count = useCountSelector();

  const increment = useCallback(() => dispatch(incrementAction()), [dispatch]);

  return (
    <>
      <Button onClick={increment} variant="contained">
        Increment
      </Button>
      <div>
        Redux count:
        <Chip label={count} />
      </div>
    </>
  );
};

export default PauseableReduxItem;
