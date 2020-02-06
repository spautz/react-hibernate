import * as React from 'react';
import PropTypes from 'prop-types';

const StaticReduxContainer: React.FC<{}> = ({ children }) => {
  return <>{children}</>;
};

StaticReduxContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default StaticReduxContainer;
