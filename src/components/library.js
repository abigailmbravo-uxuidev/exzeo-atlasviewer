import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList, faFilter } from '@fortawesome/free-solid-svg-icons';
import Feeds from './feeds';
import NotificationPanel from './notifications';
import Overlays from './overlays';
import ReactTooltip from 'react-tooltip';

import Icon from './icon';

const Library = ({ setIsMapLoading }) => {
  const [libraryActive, setLibraryState] = useState(true);
  const [filter, setFilter] = useState('');
  const handleFilter = ({ target: { value } }) => setFilter(value);

  return (
    <div id="library" className={`panel ${libraryActive ? 'open' : 'closed'}`}>
      <div className="panel-content">
        <div className="section notifications">
          <NotificationPanel />
        </div>
        <div className="section search">
          <div className="icon">
            <Icon />
          </div>
          <div className="search-wrapper">
            <label htmlFor="search">Filter feeds &amp; Layers</label>
            <div className="searchBar">
              <span className="input-icon-wrapper">
                <input
                  placeholder="Type to filter by name or tag"
                  type="input"
                  name="search"
                  id="search"
                  onChange={handleFilter}
                />
                <FontAwesomeIcon icon={faFilter} />
              </span>
            </div>
          </div>
        </div>
        <div className="section feeds">
          <Feeds filter={filter} setIsMapLoading={setIsMapLoading} />
        </div>
        <div className="section shapes">
          <Overlays filter={filter} setIsMapLoading={setIsMapLoading} />
        </div>
      </div>
      <div className="panel-tab library-tab">
        <button onClick={() => setLibraryState(!libraryActive)}>
          <FontAwesomeIcon icon={faList} />
        </button>
      </div>
    </div>
  );
};

export default Library;
