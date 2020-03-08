import React, { ReactElement } from 'react';
import Button from '@material-ui/core/Button';

const NestedState: React.FC = (): ReactElement => {
  const [counterValue, setCounterValue] = React.useState(0);

  return (
    <Button
      variant="contained"
      onClick={(): void => {
        setCounterValue((value) => value + 1);
      }}
    >
      I&apos;ve been clicked {counterValue} {counterValue === 1 ? 'time' : 'times'}
    </Button>
  );
};

export default NestedState;
