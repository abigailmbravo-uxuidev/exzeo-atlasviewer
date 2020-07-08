import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import MarkerRow from './marker-row';
import Circle from './circle.js';
import hexagon from '../img/hexagon-12.png';
import square from '../img/square-12.png';
import pentagon from '../img/pentagon-12.png';
import triangle from '../img/triangle-12.png';

const MarkerPopup = ({ properties, feedName }) => {
  const markerName = properties.Name || properties.name || 'Feed';
  const color = properties.status_color || 'black';
  const shape = properties.symbol ? properties.symbol.toLowerCase() : circle;

  const shapes = {
    Circle,
    hexagon,
    square,
    pentagon,
    triangle
  };

  const displaySymbol = Circle;//shapes[shape] || circle;
  displaySymbol.fill = 'red';
  return (
    <div className="marker-popup">
      <div className="marker-popup-title-header">
        <p>{feedName}</p>
      </div>
      <div className="marker-popup-header">
        <h2 className="title-tip" title={markerName.replace('<br/>', ' ')}>
          {markerName.replace('<br/>', ' ')}
        </h2>
        <p>
          <span className="icon-wrapper wrapper" style={{ color: color }}>
            <Circle fill={color} />
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
