import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { useUser } from '../context/user-context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faImage,
  faEye,
  faSlashEye,
  faGlobeAmericas,
  faNetworkWired,
  faLayerGroup,
  faExternalLinkSquareAlt,
  faCircle
} from '@fortawesome/free-solid-svg-icons';
import Logo from './logo';
import Icon from './icon';
import { useFeedState } from '../context/feed-context';
import { mapStyles } from './map.utils';
import ReactTooltip from 'react-tooltip';

const View = ({ setBasemap }) => {
  const user = useUser();
  const feeds = useFeedState();
  const [viewActive, setViewState] = useState(true);

  useEffect(() => {
    setViewState(false);
  }, []);

  const handleBasemap = ({ target: { value } }) => {
    setBasemap(value);
  };

  const activeFeeds = feeds.filter(feed => feed.active);

  return (
    <div id="view" className={`panel ${viewActive ? 'open' : 'closed'}`}>
      <div className="section logo">
        <Logo />
      </div>
      <div className="scroll">
        <div className="section view">
          <header>
            <h4>
              <FontAwesomeIcon icon={faImage} />
              &nbsp;Current View
            </h4>
          </header>
          {/* start of active feeds loop */}
          <label htmlFor="feeds">Feeds</label>
          <ul className="panel-list">
            {activeFeeds.length > 0 &&
              activeFeeds.map(feed => (
                <li key={feed._id}>
                  <span className="eyeball-wrapper wrapper">
                    <FontAwesomeIcon icon={faEye} />
                    {/* toggle eye icon={faSlashEye} */}
                  </span>
                  <span className="feed-detail-wrapper wrapper">
                    <h5>
                      <span
                        className="overlay-name"
                        data-tip
                        data-for="feedTooltip"
                      >
                        {feed.name}
                      </span>
                    </h5>
                  </span>
                  <span className="icon-popOut">
                    <FontAwesomeIcon icon={faExternalLinkSquareAlt} />
                  </span>
                  {/* if details/statuses exist show loop and total --------------------------------------- */}
                  <ul className="detail-list">
                    {feed.statuses.length > 0 &&
                      feed.statuses.map((status, index) => (
                        <li key={index}>
                          <span className="eyeball-wrapper wrapper">
                            <FontAwesomeIcon icon={faEye} />
                            {/* toggle eye icon={faSlashEye} */}
                          </span>
                          <span
                            className="icon-wrapper wrapper"
                            style={{ color: status.color }}
                          >
                            <FontAwesomeIcon icon={faCircle} />
                            {/* maps to icon and color from feed */}
                          </span>
                          <span className="feed-detail-wrapper wrapper">
                            <h6>
                              <span className="detail-name">{status.name}</span>
                            </h6>
                          </span>
                          <span className="detail-count">{status.count}</span>
                        </li>
                      ))}
                  </ul>
                  <div className="total-count">
                    <span>Total:&nbsp;</span>
                    {feed.total}
                  </div>
                  {/* end of feed detail loop */}
                </li>
              ))}
          </ul>
          {/* end of active feeds loop */}
          {/* start of active layers loop */}
          <label htmlFor="layer">Layers</label>
          <ul className="panel-list">
            {/* layer start */}
            <li>
              <span className="eyeball-wrapper wrapper">
                <FontAwesomeIcon icon={faEye} />
                {/* toggle eye icon={faSlashEye} */}
              </span>
              <span className="feed-detail-wrapper wrapper">
                <h5>
                  <span
                    className="overlay-name"
                    data-tip
                    data-for="layerTooltip"
                  >
                    [ Layer Name ]
                  </span>
                </h5>
              </span>
            </li>
            {/* layer end */}
          </ul>
          {/* end of active layers loop */}
          <label htmlFor="baseMap">Base Map</label>
          <div className="base-map-wrapper">
            <select onChange={handleBasemap}>
              {mapStyles &&
                mapStyles.map(style => (
                  <option key={style.label} value={style.value}>
                    {style.label}
                  </option>
                ))}
            </select>
          </div>
        </div>
      </div>
      <div className="panel-tab view-tab">
        <button onClick={() => setViewState(!viewActive)}>
          <Icon />
        </button>
      </div>

      <ReactTooltip
        className="panel-tooltip"
        id="feedTooltip"
        place="right"
        effect="float"
        type="light"
        delayHide={500}
        delayShow={200}
        backgroundColor="#fff"
        border={true}
        borderColor="#ddd"
      >
        <h5>[ Feed Name ]</h5>
        <dl>
          <span>
            <dt>Created</dt>
            <dd>[ Created ]</dd>
          </span>
          <span>
            <dt>Updated</dt>
            <dd>[ Updated ]</dd>
          </span>
          <span>
            <dt>Author</dt>
            <dd>[ Author ]</dd>
          </span>
        </dl>
      </ReactTooltip>
      <ReactTooltip
        className="tooltip"
        id="layerTooltip"
        place="right"
        effect="float"
        type="light"
        delayHide={500}
        delayShow={200}
        backgroundColor="#fff"
        border={true}
        borderColor="#ddd"
      >
        <h5>[ Layer Name ]</h5>
      </ReactTooltip>
    </div>
  );
};

export default View;

//ABBY THIS IS WHAT YOU NEED
