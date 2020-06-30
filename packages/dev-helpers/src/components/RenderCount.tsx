import PropTypes from 'prop-types';
import React, { useRef } from 'react';

import Typography from '@material-ui/core/Typography';

interface RenderCountProps {
  prefix?: string;
}

const RenderCount: React.FC<RenderCountProps> = (props) => {
  const { prefix = 'Render count: ' } = props;

  const renderCountRef = useRef(0);
  renderCountRef.current++;

  return (
    <Typography variant="body1">
      {prefix}
      {renderCountRef.current}
    </Typography>
  );
};

RenderCount.propTypes = {
  prefix: PropTypes.string,
};

export default RenderCount;
