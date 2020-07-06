import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import MarkerRow from './marker-row';

const MarkerPopup = ({ properties, feedName }) => {
  const markerName = properties.Name || properties.name || 'Feed';

  return (
    <div className="marker-popup">
      <div className="marker-popup-title-header">
        {/* TO DO: @ERIC - this is the placeholder for the feed name */}
        <p>{feedName}</p>
      </div>
      <div className="marker-popup-header">
        <h2 className="title-tip" title={markerName.replace('<br/>', ' ')}>
          {markerName.replace('<br/>', ' ')}
        </h2>
        <p>
          {/* TO DO: @ERIC - here we just need help finding the status color so it properly displays the mapping color*/}
          <span
            className="icon-wrapper wrapper"
            style={{ color: status.color }}
          >
            <FontAwesomeIcon icon={faCircle} />
          </span>
          {properties.status_name}
        </p>
      </div>
      <div className="popupContent">
        <ul>
          {properties &&
            Object.entries(properties).map(([key, value]) => (
              <MarkerRow key={key} column={key} value={value} />
            ))}
        </ul>
      </div>
    </div>
  );
};

MarkerPopup.propTypes = {
  properties: PropTypes.object,
  feedName: PropTypes.string
};

export default MarkerPopup;
