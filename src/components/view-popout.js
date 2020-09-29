import React, { useState, Fragment } from 'react';
import { createPortal } from 'react-dom';
import StatusIcon from './status-icon.js';
import PropTypes from 'prop-types';
import Draggable from 'react-draggable';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEye,
  faEyeSlash,
  faTimes,
  faCircle,
  faChevronLeft,
  faChevronRight
} from '@fortawesome/free-solid-svg-icons';
import { formatCurrency } from '../utils/utils';

const formatKey = value => value.replace(/-dollar|-sum/gi, '');
const formatAvg = (value, count) => {
  return (count === 0) ? 0 : Math.round(value / count * 100) / 100;
};
const numberFormat = new Intl.NumberFormat('en-US');

const ViewPopout = ({ feed, toggleFeed, toggleStatus, close }) => {
  const [panelCollapse, setPanelCollapseState] = useState('expanded');
  const { _id } = feed;
  const aggregateTotals = {};
  const aggregateCounts = {};

  return createPortal(
    <Draggable handle=".gripper" defaultPosition={{ x: 600, y: 32 }}>
      <div
        className={`feed-popOut ${panelCollapse}`}
        style={{ width: panelCollapse == 'collapsed' ? '16rem' : 'initial' }}
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
          <span
            className="eyeball-wrapper wrapper"
            role="button"
            tabIndex="0"
            onClick={() => toggleFeed(feed)}
            onKeyDown={() => toggleFeed(feed)}
          >
            {feed.active ? (
              <FontAwesomeIcon icon={faEye} />
            ) : (
              <FontAwesomeIcon icon={faEyeSlash} />
            )}
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
                  <th className="status-count">Count</th>
                  {/* Start loop of column titles */}
                  {feed.statuses &&
                    Object.entries(feed.statuses[0].aggregates).map(([key]) => (
                      <Fragment key={key}>
                        <th>{formatKey(key)}</th>
                        {!key.toLowerCase().endsWith('sum') && (
                          <th>{formatKey(key)} Avg</th>
                        )}
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
                          <span
                            className="eyeball-wrapper wrapper"
                            role="button"
                            tabIndex={index}
                            onClick={() => toggleStatus(feed, status.name)}
                            onKeyDown={() => toggleStatus(feed, status.name)}
                          >
                            {!feed.filter ||
                            !feed.filter.includes(status.name) ? (
                              <FontAwesomeIcon icon={faEye} />
                            ) : (
                              <FontAwesomeIcon icon={faEyeSlash} />
                            )}
                          </span>
                          {/* icon from data should be added here - will need to figure this out */}
                          <span
                            className="icon-wrapper wrapper"
                            style={{ color: status.color }}
                          >
                            <StatusIcon
                              shape={status.symbol}
                              fill={status.color}
                            />
                          </span>
                          <span className="status-name title-tip">
                            {status.name}
                          </span>
                        </div>
                      </th>
                      <td className="status-count">
                        {numberFormat.format(status.count)}
                      </td>
                      {status.aggregates &&
                        Object.entries(status.aggregates).map(
                          ([key, value]) => {
                            // Add up Totals and counts for use in Aggregate Data line
                            aggregateTotals[key] = aggregateTotals[key]
                              ? Number(aggregateTotals[key]) + Number(value)
                              : Number(value);
                            aggregateCounts[key] = aggregateCounts[key]
                              ? Number(aggregateCounts[key]) + Number(status.aggregatesCount[key])
                              : Number(status.aggregatesCount[key]);
                            return (
                              <Fragment key={key}>
                                <td className={key}>
                                  {key.toLowerCase().endsWith('sum')
                                    ? numberFormat.format(value)
                                    : formatCurrency.format(value)}
                                </td>
                                {!key.toLowerCase().endsWith('sum') && (
                                  <td className={`average ${key}`}>
                                    {formatCurrency.format(formatAvg(value, Number(status.aggregatesCount[key])))}
                                  </td>
                                )}
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
                  <td className="status-count">
                    {numberFormat.format(feed.total)}
                  </td>
                  {aggregateTotals &&
                    Object.entries(aggregateTotals).map(([key, value]) => (
                      <Fragment key={key}>
                        <td>
                          {key.toLowerCase().endsWith('sum')
                            ? numberFormat.format(value)
                            : formatCurrency.format(value)}
                        </td>
                        {!key.toLowerCase().endsWith('sum') && (
                          <td>{formatCurrency.format(value / Number(aggregateCounts[key]))}</td>
                          )}
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
    </Draggable>,
    document.getElementById('popout')
  );
};

ViewPopout.propTypes = {
  feed: PropTypes.object.isRequired,
  toggleFeed:PropTypes.func.isRequired,
  toggleStatus: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired
};

export default ViewPopout;
