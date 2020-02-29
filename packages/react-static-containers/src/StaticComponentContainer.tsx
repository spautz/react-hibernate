import React, { ReactNode } from 'react';

import { StaticContainerProps } from './types';

// This is based on https://github.com/reactjs/react-static-container/ -- but with types
class StaticComponentContainer extends React.Component<StaticContainerProps> {
  shouldComponentUpdate(nextProps: StaticContainerProps): boolean {
    return nextProps.shouldUpdate;
  }

  render(): ReactNode {
    const child = this.props.children;
    if (child === null || child === false) {
      return null;
    }
    return React.Children.only(child);
  }
}

export default StaticComponentContainer;
