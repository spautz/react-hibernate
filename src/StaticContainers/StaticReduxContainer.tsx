import * as React from 'react';
import PropTypes from 'prop-types';

const StaticReduxContainer: React.FC<{}> = ({ children }) => {
  return <React.Fragment>{children}</React.Fragment>;
};

StaticReduxContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default StaticReduxContainer;
