import React, { ReactNode } from 'react';

import { PauseableContainerProps } from './types';

// This is based on https://github.com/reactjs/react-static-container/ -- but with types
class PauseableComponentContainer extends React.Component<PauseableContainerProps> {
  shouldComponentUpdate(nextProps: PauseableContainerProps): boolean {
    return nextProps.shouldUpdate;
  }

  render(): ReactNode {
    return this.props.children;
  }
}

export default PauseableComponentContainer;
