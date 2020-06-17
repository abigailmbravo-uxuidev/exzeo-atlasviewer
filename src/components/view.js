import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { useUser } from '../context/user-context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faImage,
  faEye,
  faGlobeAmericas,
  faNetworkWired,
  faLayerGroup,
  faExternalLinkSquareAlt,
  faEyeSlash,
  faCircle
} from '@fortawesome/free-solid-svg-icons';
import Logo from './logo';
import Icon from './icon';
import { useFeedState, useFeedDispatch } from '../context/feed-context';
import { useLayers, useSetLayers } from '../context/layer-context';
import { mapStyles } from './map.utils';
import ReactTooltip from 'react-tooltip';

const View = ({ setBasemap }) => {
  const user = useUser();
  const feeds = useFeedState();
  const dispatch = useFeedDispatch();
  const layers = useLayers();
  const setLayers = useSetLayers();
  const [viewActive, setViewState] = useState(true);

  useEffect(() => {
    setViewState(false);
  }, []);

  const inViewFeeds = feeds.filter(feed => feed.inView);
  const inViewLayers = layers.filter(layer => layer.inView);

  const handleBasemap = ({ target: { value } }) => {
    setBasemap(value);
  };

  const toggleFeed = feed => {
    const { active } = feed;

    dispatch({
      type: 'update',
      data: { ...feed, active: !active }
    });
  };

  const toggleLayer = layer => {
    const { _id, active } = layer;
    const toggleIndex = layers.findIndex(l => l._id === _id);
    const newLayers = layers.map((layer, index) => {
      if (index === toggleIndex) return { ...layer, active: !active };
      return layer;
    });
    setLayers(newLayers);
  };

  const toggleStatus = (feed, status) => {
    const statusFilter = feed.filter || [];
    const active = statusFilter.includes(status);
    const newFilter = active
      ? statusFilter.filter(s => s !== status)
      : [...(feed.filter || []), status];

    dispatch({
      type: 'update',
      data: { ...feed, filter: newFilter }
    });
  };

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
            {inViewFeeds.length > 0 &&
              inViewFeeds.map((feed, index) => (
                <li key={feed._id}>
                  <span
                    className="eyeball-wrapper wrapper"
                    role="button"
                    tabIndex={index}
                    onClick={() => toggleFeed(feed)}
                    onKeyDown={() => toggleFeed(feed)}
                  >
                    {feed.active ? (
                      <FontAwesomeIcon icon={faEye} />
                    ) : (
                      <FontAwesomeIcon icon={faEyeSlash} />
                    )}
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
                    {feed.statuses &&
                      feed.statuses.length > 0 &&
                      feed.statuses.map((status, index) => (
                        <li key={index}>
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
            {inViewLayers.length > 0 &&
              inViewLayers.map((layer, index) => (
                <li key={layer._id}>
                  <span
                    className="eyeball-wrapper wrapper"
                    role="button"
                    tabIndex={index}
                    onClick={() => toggleLayer(layer)}
                    onKeyDown={() => toggleLayer(layer)}
                  >
                    {layer.active ? (
                      <FontAwesomeIcon icon={faEye} />
                    ) : (
                      <FontAwesomeIcon icon={faEyeSlash} />
                    )}
                  </span>
                  <span className="feed-detail-wrapper wrapper">
                    <h5>
                      <span
                        className="overlay-name"
                        data-tip
                        data-for="layerTooltip"
                      >
                        {layer.name}
                      </span>
                    </h5>
                  </span>
                </li>
              ))}
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
