import React from 'react';
import PropTypes from 'prop-types';

function strip(html) {
  var doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.body.textContent || '';
}

const MarkerPopup = ({ properties }) => {
  return (
    <div className="marker-popup">
      <h2>{properties.Name.replace('<br/>', ' ')}</h2>
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
