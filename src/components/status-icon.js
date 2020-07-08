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
          <rect fill={fill} width="12" height="12" />
        </svg>
      );
    case 'hexagon':
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
    case 'pentagon':
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
    case 'circle':
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
    case 'triange':
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
    default:
      return null;
  }

};

StatusIcon.propTypes = {
  shape: PropTypes.string.isRequired,
  fill: PropTypes.string.isRequired
};

export default StatusIcon;
