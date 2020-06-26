import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import Draggable from 'react-draggable';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEye,
  faTimes,
  faCircle,
  faChevronLeft,
  faChevronRight
} from '@fortawesome/free-solid-svg-icons';
import { formatCurrency } from '../utils/utils';

const formatKey = value => value.replace(/-dollar/gi, '');
const formatAvg = (value, count) => {
  const avg = value / count;
  return Math.round(avg * 10) / 10;
};

const ViewPopout = ({ feed, close }) => {
  const [panelCollapse, setPanelCollapseState] = useState('expanded');
  const { _id } = feed;
  const aggregateTotals = {};
  console.log(panelCollapse);

  return (
    <Draggable handle=".gripper">
      <div
        className={`feed-popOut ${(panelCollapse == 'collapsed'
          ? 'collapsed'
          : '') || (panelCollapse == 'expanded' ? 'expanded' : '')}`}
        style={{ width: panelCollapse == 'collapsed' ? '13.5rem' : 'initial' }}
      >
        <header>
          {/* Gripper is draggable point for data table */}
          <span className="gripper">&nbsp;</span>
          {/* Button to close pop out data table */}
          <button className="iconBtn closeBtn" type="button">
            <FontAwesomeIcon icon={faTimes} onClick={() => close(_id)} />
          </button>
        </header>
        <div className="content">
          {/* Element to toggle hide/show of all data points */}
          <span className="eyeball-wrapper wrapper">
            <FontAwesomeIcon icon={faEye} />
            {/* toggle eye icon={faSlashEye} */}
          </span>
          <div className="table-wrapper">
            {/* Start of data table */}
            <table>
              <thead>
                <tr>
                  <th className="feed-name-wrapper">
                    {/* Name of feed */}
                    <span data-tip data-for="feedPopOverTooltip">
                      {feed.name}
                    </span>
                  </th>
                  <th>Count</th>
                  {/* Start loop of column titles */}
                  {feed.statuses &&
                    Object.entries(feed.statuses[0].aggregates).map(([key]) => (
                      <Fragment key={key}>
                        <th>{formatKey(key)}</th>
                        <th>{formatKey(key)} Avg</th>
                      </Fragment>
                    ))}
                </tr>
              </thead>
              <tbody>
                {/* Start loop of data rows */}
                {feed.statuses &&
                  feed.statuses.map((status, index) => (
                    <tr key={status.name}>
                      <th title={status.name}>
                        <div className="status-wrapper">
                          {/* Element to toggle hide/show of only this data points */}
                          <span className="eyeball-wrapper wrapper">
                            <FontAwesomeIcon icon={faEye} />
                            {/* toggle eye icon={faSlashEye} */}
                          </span>
                          {/* icon from data should be added here - will need to figure this out */}
                          <span
                            className="icon-wrapper wrapper"
                            style={{ color: status.color }}
                          >
                            <FontAwesomeIcon icon={faCircle} />
                          </span>
                          <span className="status-name title-tip">
                            {status.name}
                          </span>
                        </div>
                      </th>
                      <td>{status.count}</td>
                      {status.aggregates &&
                        Object.entries(status.aggregates).map(
                          ([key, value]) => {
                            aggregateTotals[key] = aggregateTotals[key]
                              ? Number(aggregateTotals[key]) + Number(value)
                              : Number(value);
                            return (
                              <Fragment key={key}>
                                <td>{formatCurrency.format(value)}</td>
                                <td>
                                  {formatCurrency.format(
                                    formatAvg(value, status.count)
                                  )}
                                </td>
                              </Fragment>
                            );
                          }
                        )}
                    </tr>
                  ))}
                {/* End loop of data rows */}
                {/* Start total row - assume the app will calc these rows */}
                <tr className="total-count">
                  <th>Aggregate Data:</th>
                  <td>{feed.total}</td>
                  {aggregateTotals &&
                    Object.entries(aggregateTotals).map(([key, value]) => (
                      <Fragment key={key}>
                        <td>{formatCurrency.format(value)}</td>
                        <td>{}</td>
                      </Fragment>
                    ))}
                </tr>
                {/* End total row */}
              </tbody>
            </table>
          </div>
          <div className="button-wrapper">
            <button
              className="round-btn collapse"
              onClick={() => setPanelCollapseState('collapsed')}
            >
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            <button
              className="round-btn expand"
              onClick={() => setPanelCollapseState('expanded')}
            >
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </div>
        </div>
      </div>
    </Draggable>
  );
};

ViewPopout.propTypes = {
  feed: PropTypes.object
};

export default ViewPopout;
