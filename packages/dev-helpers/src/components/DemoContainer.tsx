import React, { ReactElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

import NestedState from './NestedState';

import { incrementAction, DevHelperState } from '../redux';

export interface DemoContainerProps {
  title: string;
  withRedux?: boolean;
  onMount?: (instanceTitle: string) => void;
  onRender?: (instanceTitle: string) => void;
  onUnmount?: (instanceTitle: string) => void;
}

const selectEntireState = (state: DevHelperState): DevHelperState => state;

let totalInstanceCount = 0;

const DemoContainer: React.FC<DemoContainerProps> = (props: DemoContainerProps): ReactElement => {
  const { title, withRedux, onMount, onRender, onUnmount } = props;

  // A simple per-Component instance counter
  const myInstanceNumRef = React.useRef(0);
  if (!myInstanceNumRef.current) {
    totalInstanceCount++;
    myInstanceNumRef.current = totalInstanceCount;
  }
  const myInstanceNum = myInstanceNumRef.current;

  const titleWithMyInstanceNum = `${title} (#${myInstanceNum})`;

  const mountTimeString = React.useRef(new Date().toUTCString()).current;
  const renderCount = ++React.useRef(0).current;

  React.useEffect((): (() => void) => {
    console.log(`DemoContainer ${titleWithMyInstanceNum} mounted`);
    if (onMount) {
      // Wait an extra tick for Storybook to catch up, or else actions won't be logged
      setTimeout(() => onMount(titleWithMyInstanceNum));
    }
    return (): void => {
      console.log(`DemoContainer ${titleWithMyInstanceNum} unmounted`);
      if (onUnmount) {
        setTimeout(() => onUnmount(titleWithMyInstanceNum));
      }
    };
  }, []);

  React.useEffect(() => {
    console.log(`DemoContainer ${titleWithMyInstanceNum} rendered`);
    if (onRender) {
      onRender(titleWithMyInstanceNum);
    }
  });

  // Our own local state
  const [value1, setValue1] = React.useState('');
  // Global state, if appropriate
  let reduxContent;
  if (withRedux) {
    const state = useSelector(selectEntireState);
    const dispatch = useDispatch();

    reduxContent = (
      <Grid item xs={4}>
        <p>A redux-connected component</p>
        <Button
          variant="contained"
          onClick={(): void => {
            dispatch(incrementAction());
          }}
        >
          Dispatch a counter update
        </Button>
        <pre>{JSON.stringify(state, null, 2)}</pre>
      </Grid>
    );
  }

  return (
    <fieldset>
      <legend>DemoContainer: {titleWithMyInstanceNum}</legend>
      <p>
        Mounted at {mountTimeString}, rendered {renderCount} times.
      </p>
      <Grid container>
        <Grid item xs={4}>
          <p>Controlled input: value is in DemoContainer&apos;s state</p>
          <TextField
            label="Component state"
            variant="outlined"
            value={value1}
            onChange={(e): void => {
              setValue1(e.target.value);
            }}
          />

          <p>Raw input: value is in dom only</p>
          <TextField label="DOM state" variant="outlined" />
        </Grid>
        <Grid item xs={4}>
          <p>Nested components with their own state</p>
          <NestedState />
          <NestedState />
        </Grid>
        {!!withRedux && reduxContent}
      </Grid>
    </fieldset>
  );
};
DemoContainer.defaultProps = {
  withRedux: false,
};

export default DemoContainer;
