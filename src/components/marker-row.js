import React from 'react';
import PropTypes from 'prop-types';

const stripBreaks = value =>
  value && value.replace ? value.replace(/[<]br[^>]*[>]/gi, '') : value;

const MarkerRow = ({ column, value }) => {
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

MarkerRow.propTypes = {
  column: PropTypes.string,
  calue: PropTypes.string
};

export default MarkerRow;