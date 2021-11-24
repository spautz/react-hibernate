import PropTypes from 'prop-types';
import React, { useRef } from 'react';

import Typography from '@material-ui/core/Typography';

const RenderCount: React.FC = () => {
  const renderCountRef = useRef(0);
  renderCountRef.current++;

  return (
    <Typography variant="body1">
      (I&apos;ve rendered {renderCountRef.current} {renderCountRef.current === 1 ? 'time' : 'times'}
      )
    </Typography>
  );
};

RenderCount.propTypes = {
  prefix: PropTypes.string,
};

export { RenderCount };
