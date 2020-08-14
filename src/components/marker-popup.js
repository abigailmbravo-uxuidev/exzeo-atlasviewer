import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import MarkerRow from './marker-row';
import StatusIcon from './status-icon.js';

const MarkerPopup = ({ properties, feedName }) => {
  const markerName = properties.Name || properties.name || 'Feed';
  const color = properties.status_color || 'black';
  const shape = properties.symbol ? properties.symbol.toLowerCase() : circle;

  return (
    <div className="marker-popup">
      <div className="marker-popup-title-header">
        <p>{feedName}</p>
      </div>
      <div className="marker-popup-header">
        <h2 className="title-tip" title={markerName.replace('<br/>', '\u000A')}>
          {markerName.replace('<br/>', '\u000A')}
        </h2>
        <p>
          <span className="icon-wrapper wrapper" style={{ color: color }}>
            <StatusIcon shape={shape} fill={color} />
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
