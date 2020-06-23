import React from 'react';
import PropTypes from 'prop-types';

function strip(html) {
  var doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.body.textContent || '';
}

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
                <span>{key}</span> {strip(value)}
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
