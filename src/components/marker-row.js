import React from 'react';
import PropTypes from 'prop-types';
import { format, parse } from 'date-fns';
import { convertBreaks, formatCurrency, formatTime } from '../utils/utils';

const doNotShow = ['lat', 'lon', 'lng', 'latitude', 'longitude', '-sum'];

const MarkerRow = ({ column, value }) => {
  const filter = ['name', 'status_name', 'status_color', 'symbol'];
  const columnName = column.toLowerCase();

  if (
    doNotShow.includes(columnName) ||
    value === undefined ||
    String(value).toLowerCase() === 'null'
  ) return null;

  let formattedValue = value;

  if (columnName.endsWith('-url')) {
    return (
      <li key={column}>
        <span>
          <a
            href={value}
            titile={value}
            rel="noopener noreferrer"
            target="_blank"
          >
            {column.replace(/-url/i, '')}
          </a>
        </span>
      </li>
    );
  }

  if (columnName.endsWith('-date')) {
    formattedValue = format(new Date(formattedValue), 'MM/dd/yyyy');
  }

  if (columnName.endsWith('-datetime')) {
    formattedValue = format(new Date(formattedValue), 'MM/dd/yyyy h:mm a');
  }

  if (columnName.endsWith('-time')) {
    formattedValue = formatTime(formattedValue);
  }

  if (columnName.endsWith('-dollar')) {
    formattedValue =
      !formattedValue || isNaN(formattedValue)
        ? ''
        : formatCurrency.format(formattedValue);
  }

  if (columnName.endsWith('-percent') || columnName.endsWith('-percentage')) {
    formattedValue = String(formattedValue).includes('%')
      ? formattedValue
      : `${formattedValue} %`;
  }

  let columnDisplay = column.replace(
    /\b(-dollar|-date|-datetime|-time|-dollar|-percent|-percentage|-sum)\b/i,
    ''
  );

  columnDisplay = columnDisplay.replace('_', ' ');

  return filter.includes(columnName) ? null : (
    <li key={column}>
      <span>{columnDisplay}</span>
      {convertBreaks(formattedValue)}
    </li>
  );
};

MarkerRow.propTypes = {
  column: PropTypes.string,
  calue: PropTypes.string
};

export default MarkerRow;
