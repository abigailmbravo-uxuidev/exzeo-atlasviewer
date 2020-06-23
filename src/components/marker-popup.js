import React from 'react';
import PropTypes from 'prop-types';

const stripBreaks = value =>
  value && value.replace ? value.replace(/[<]br[^>]*[>]/gi,'') : value;

const MarkerPopup = ({ properties }) => {
  const feedName = properties.Name || properties.name || 'Feed';
  return (
    <div className="marker-popup">
      <h2>{feedName.replace('<br/>', ' ')}</h2>
      <div className="popupContent">
        <ul>
          {properties &&
            Object.entries(properties).map(([key, value]) => (
              <li key={key}>
                <span>{key}</span> {stripBreaks(value)}
              </li>
            ))}
        </ul>
      </div>
      <h4>{properties.PolicyStatus}</h4>
    </div>
  );
};

MarkerPopup.propTypes = {
  properties: PropTypes.object
};

export default MarkerPopup;
