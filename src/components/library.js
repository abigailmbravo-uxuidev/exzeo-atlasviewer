import React, { useState, Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList, faFilter } from '@fortawesome/free-solid-svg-icons';
import Feeds from './feeds';
import Overlays from './overlays';

import Icon from './icon';

const Library = ({ setLayerToggle }) => {
  const [libraryActive, setLibraryState] = useState(true);
  const [filter, setFilter] = useState('');
  const handleFilter = ({ target: { value } }) => setFilter(value);

  return (
    <div id="library" className={`panel ${libraryActive ? 'open' : 'closed'}`}>
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
      <div className="scroll">
        <div className="section feeds">
          <Feeds filter={filter} />
        </div>
        <div className="section shapes">
          <Overlays filter={filter} setLayerToggle={setLayerToggle} />
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
