import React, { Fragment } from 'react';
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
                      <div className="table-data">
                        {status.aggregates &&
                          Object.entries(status.aggregates).map(
                            ([key, value]) => (
                              <Fragment key={key}>
                                <div className="table-header">{key}</div>
                                <div className="table-body">{value}</div>
                              </Fragment>
                            )
                        )}
                      </div>
                    </div>
                  ))}
                <div className="table-footer">totals:</div>
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
