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
import { mapStyles } from './map.utils';
import ReactTooltip from 'react-tooltip';

const View = ({ setBasemap }) => {
  const user = useUser();
  const [viewActive, setViewState] = useState(true);

  useEffect(() => {
    setViewState(false);
  }, []);

  const handleBasemap = e => {
    setBasemap(mapStyles[e.target.value]);
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
            {/* feed start */}
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
                    data-for="registerTip"
                  >
                    [ Feed Name ]
                  </span>
                </h5>
              </span>
              <span className="icon-popOut">
                <FontAwesomeIcon icon={faExternalLinkSquareAlt} />
              </span>
              {/* if details/statuses exist show loop and total --------------------------------------- */}
              {/* start of feed detail loop --------------------------------------- */}
              <ul className="detail-list">
                <li>
                  <span className="eyeball-wrapper wrapper">
                    <FontAwesomeIcon icon={faEye} />
                    {/* toggle eye icon={faSlashEye} */}
                  </span>
                  <span
                    className="icon-wrapper wrapper"
                    style={{ color: 'red' }}
                  >
                    <FontAwesomeIcon icon={faCircle} />
                    {/* maps to icon and color from feed */}
                  </span>
                  <span className="feed-detail-wrapper wrapper">
                    <h6>
                      <span className="detail-name">[ Detail Name ]</span>
                    </h6>
                  </span>
                  <span className="detail-count">[ 1,000,000 ]</span>
                </li>

                <li>
                  <span className="eyeball-wrapper wrapper">
                    <FontAwesomeIcon icon={faEye} />
                    {/* toggle eye icon={faSlashEye} */}
                  </span>
                  <span
                    className="icon-wrapper wrapper"
                    style={{ color: 'blue' }}
                  >
                    <FontAwesomeIcon icon={faCircle} />
                    {/* maps to icon and color from feed */}
                  </span>
                  <span className="feed-detail-wrapper wrapper">
                    <h6>
                      <span className="detail-name">[ Detail Name ]</span>
                    </h6>
                  </span>
                  <span className="detail-count">[ 1,000,000 ]</span>
                </li>
              </ul>
              <div className="total-count">
                <span>Total:&nbsp;</span>[ 2,000,000 ]
              </div>
              {/* end of feed detail loop */}
            </li>
            {/* feed end */}
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
                  <span className="overlay-name">[ Layer Name ]</span>
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
        id="registerTip"
        place="right"
        effect="float"
        type="light"
        delayHide={500}
        backgroundColor="#fff"
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
    </div>
  );
};

export default View;

//ABBY THIS IS WHAT YOU NEED
