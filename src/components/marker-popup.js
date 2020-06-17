import React from 'react';
import PropTypes from 'prop-types';

const MarkerPopup = ({ properties }) => {
  return (
    <div>
      <h2>Properties</h2>
      <ul>
        {properties &&
          Object.entries(properties).map(([key, value]) => (
            <li key={key}>
              <span>{key}</span> {value}
            </li>
          ))}
      </ul>
    </div>
  );
};

MarkerPopup.propTypes = {
  properties: PropTypes.object
};

export default MarkerPopup;
