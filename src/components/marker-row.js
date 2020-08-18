import React from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import { convertBreaks } from '../utils/utils';

const doNotShow = ['lat', 'lon', 'lng', 'latitude', 'longitude'];

const MarkerRow = ({ column, value }) => {
  const filter = ['name', 'status_name', 'status_color', 'symbol'];
  const columnName = column.toLowerCase();

  if (doNotShow.includes(columnName)) return null;

  let formattedValue = value;

  if (columnName.includes('-url')) {
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

  if (columnName.includes('-date')) {
    formattedValue = format(new Date(formattedValue), 'MM-dd-yyyy');
  }

  return filter.includes(columnName) ? null : (
    <li key={column}>
      <span>{column.replace(/-dollar|-date/i, '')}</span>
      {convertBreaks(formattedValue)}
    </li>
  );
};

MarkerRow.propTypes = {
  column: PropTypes.string,
  calue: PropTypes.string
};

export default MarkerRow;
