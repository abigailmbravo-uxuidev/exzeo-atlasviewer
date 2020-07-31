import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTable, useRowSelect } from 'react-table';
import Checkbox from './checkbox';

const Table = ({ columns, data, setSelectedRows }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    selectedFlatRows,
    state: { selectedRowIds }
  } = useTable(
    {
      columns,
      data
    },
    useRowSelect,
    hooks => {
      hooks.visibleColumns.push(columns => [
        ...columns,
        {
          id: 'selection',
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <div>
              <Checkbox {...getToggleAllRowsSelectedProps()} indeterminate />
            </div>
          ),
          Cell: ({ row }) => (
            <div>
              <Checkbox {...row.getToggleRowSelectedProps()} />
            </div>
          )
        }
      ]);
    }
  );

  useEffect(() => {
    setSelectedRows(selectedRowIds);
  }, [setSelectedRows, selectedRowIds]);

  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup, index) => (
          <tr key={index} {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column, index) => (
              <th key={index} {...column.getHeaderProps()}>
                {column.render('Header')}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map(
          (row, i) =>
            prepareRow(row) || (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell, index) => {
                  return (
                    <td key={index} {...cell.getCellProps()}>
                      {cell.render('Cell')}
                    </td>
                  );
                })}
              </tr>
            )
        )}
      </tbody>
    </table>
  );
};

Table.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired
};

export default Table;
