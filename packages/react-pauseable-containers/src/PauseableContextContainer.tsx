import propTypes from 'prop-types';
import React, { Context, useContext, useRef } from 'react';

import { PauseableContainerProps } from './types';

export interface PauseableContextContainerProps extends PauseableContainerProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Context: Context<any>;
}

const PauseableContextContainer: React.FC<PauseableContextContainerProps> = (props) => {
  const { children, Context, shouldUpdate } = props;

  const currentValue = useContext(Context);
  const lastAllowedValueRef = useRef(currentValue);
  if (shouldUpdate) {
    lastAllowedValueRef.current = currentValue;
  }

  return <Context.Provider value={lastAllowedValueRef.current}>{children}</Context.Provider>;
};

PauseableContextContainer.propTypes = {
  // @TODO: Trying to replicate the Consumer/Producer shape in propTypes doesn't play nice with InferProps
  Context: propTypes.any.isRequired,
  children: propTypes.node.isRequired,
  shouldUpdate: propTypes.bool.isRequired,
};

export { PauseableContextContainer };
