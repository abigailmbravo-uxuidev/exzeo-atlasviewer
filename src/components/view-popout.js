import React from 'react';
import PropTypes from 'prop-types';
import Draggable from 'react-draggable';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faTimes, faCircle } from '@fortawesome/free-solid-svg-icons';

const ViewPopout = ({ feed, close }) => {
  const { _id } = feed;
  return (
    <Draggable handle=".gripper">
      <div className="feed-popOut">
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
                  <th>
                    {/* Name of feed */}
                    <span data-tip data-for="feedPopOverTooltip">
                      {feed.name}
                    </span>
                  </th>
                  {/* Start loop of column titles */}
                  <th>head</th>
                  <th>head</th>
                  <th>head</th>
                  <th>head</th>
                  <th>head</th>
                  {/* End loop of column titles */}
                </tr>
              </thead>
              <tbody>
                {/* Start loop of data rows */}
                {feed.statuses &&
                  feed.statuses.map((status, index) => (
                    <tr key={status.name}>
                      <th>
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
                        {status.name}
                      </th>
                      {status.aggregates &&
                        Object.entries(
                          status.aggregates
                        ).map(([key, value]) => <td key={key}>{value}</td>)}
                    </tr>
                  ))}
                {/* End loop of data rows */}
                {/* Start total row - assume the app will calc these rows */}
                <tr className="total-count">
                  <th>totals:</th>
                  <td>body</td>
                  <td>body</td>
                  <td>body</td>
                  <td>body</td>
                  <td>body</td>
                </tr>
                {/* End total row */}
              </tbody>
            </table>

            <div className="grid-container grid-feed-popout">
              <div className="table-status">
                <div className="table-header">{feed.name}</div>
                {feed.statuses &&
                  feed.statuses.map((status, index) => (
                    <div key={status.name}>
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
                      {status.name}
                    </div>
                  ))}
                <div className="table-footer">totals:</div>
              </div>
              <div className="table-data">
                <div className="table-header">[ header ]</div>
                <div className="table-body">[ body ]</div>
                <div className="table-footer">[ calc ]</div>
              </div>
            </div>
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
