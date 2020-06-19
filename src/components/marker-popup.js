import React from 'react';
import PropTypes from 'prop-types';

const MarkerPopup = ({ properties }) => {
  return (
    <div className="marker-popup">
      <h2>{properties.Name.replace(/<[^>]*>?/gm, ' ')}</h2>
      <div className="popupContent">
        <ul>
          {properties &&
            Object.entries(properties).map(([key, value]) => (
              <li key={key}>
                <span>{key}</span> {value}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

MarkerPopup.propTypes = {
  properties: PropTypes.object
};

export default MarkerPopup;
