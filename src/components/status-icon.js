import React from 'react';
import PropTypes from 'prop-types';

const StatusIcon = ({ shape, fill }) => {
  switch (shape) {
    case 'circle':
      return (
        <svg
          id="Layer_1"
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 12 12"
        >
          <circle fill={fill} cx="6" cy="6" r="6" />
        </svg>
      );
    case 'hexagon':
      return (
        <svg
          id="Layer_1"
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 13 11.26"
        >
          <polygon
            fill={fill}
            points="9.75 0 3.25 0 0 5.63 3.25 11.26 9.75 11.26 13 5.63 9.75 0"
          />
        </svg>
      );
    case 'pentagon':
      return (
        <svg
          id="Layer_1"
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 13 12.36"
        >
          <polygon
            fill={fill}
            className="cls-1"
            points="6.5 0 0 4.72 2.48 12.36 10.52 12.36 13 4.72 6.5 0"
          />
        </svg>
      );
    case 'square':
      return (
        <svg
          id="Layer_1"
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 12 12"
        >
          <rect fill={fill} width="12" height="12" />
        </svg>
      );
    case 'triangle':
      return (
        <svg
          id="Layer_1"
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 13 11.26"
        >
          <polygon
            fill={fill}
            className="cls-1"
            points="6.5 0 0 11.26 13 11.26 6.5 0"
          />
        </svg>
      );
    default:
      return null;
  }
};

StatusIcon.propTypes = {
  shape: PropTypes.string.isRequired,
  fill: PropTypes.string.isRequired
};

export default StatusIcon;
