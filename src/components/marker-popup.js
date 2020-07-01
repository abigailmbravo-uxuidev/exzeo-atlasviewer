import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';

const stripBreaks = value =>
  value && value.replace ? value.replace(/[<]br[^>]*[>]/gi, '') : value;

const MarkerPopup = ({ properties }) => {
  const markerName = properties.Name || properties.name || 'Feed';

  const FilteredColumns = ({ column, value }) => {
    const filter = ['name', 'status_name', 'status_color', 'symbol'];

    if (column.toLowerCase().includes('-url')) {
      return (
        <li key={column}>
          <span>
            <a href={value} rel="noopener noreferrer" target="_blank">
              {column.replace(/-url/i, '')}
            </a>
          </span>
        </li>
      );
    }

    return filter.includes(column.toLowerCase()) ? null : (
      <li key={column}>
        <span>{column.replace(/-dollar|-date/i, '')}</span>
        {stripBreaks(value)}
      </li>
    );
  };

  return (
    <div className="marker-popup">
      <div className="marker-popup-title-header">
        {/* TO DO: @ERIC - this is the placeholder for the feed name */}
        <p>[Feed Name]</p>
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
          {properties.PolicyStatus}
        </p>
      </div>
      <div className="popupContent">
        <ul>
          {properties &&
            Object.entries(properties).map(([key, value]) => (
              <FilteredColumns key={key} column={key} value={value} />
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
