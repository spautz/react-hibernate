import * as React from 'react';
import PropTypes from 'prop-types';

const StaticComponentContainer: React.FC<{}> = ({ children }) => {
  return <React.Fragment>{children}</React.Fragment>;
};

StaticComponentContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default StaticComponentContainer;
