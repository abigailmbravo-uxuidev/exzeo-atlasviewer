import React from 'react';
import PropTypes from 'prop-types';

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
      <h2>{markerName.replace('<br/>', ' ')}</h2>
      <div className="popupContent">
        <ul>
          {properties &&
            Object.entries(properties).map(([key, value]) => (
              <FilteredColumns key={key} column={key} value={value} />
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
