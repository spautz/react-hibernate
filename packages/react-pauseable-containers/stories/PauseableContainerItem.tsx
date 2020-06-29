import PropTypes from 'prop-types';
import React, { useRef } from 'react';

import Chip from '@material-ui/core/Chip';

export interface SimpleChildProps {
  count: number;
}
const SimpleCountChild: React.FC<SimpleChildProps> = (props) => {
  const { count } = props;

  const renderCountRef = useRef(0);
  renderCountRef.current++;

  return (
    <>
      <Chip label={count} />
      Rendered {renderCountRef.current} times
    </>
  );
};

SimpleCountChild.propTypes = {
  count: PropTypes.number.isRequired,
};

export default SimpleCountChild;
