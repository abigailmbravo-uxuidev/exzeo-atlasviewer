import React, { useState, Fragment } from 'react';
import Feeds from './feeds';
import Overlays from './overlays';
import Uploader from './uploader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList, faFilter } from '@fortawesome/free-solid-svg-icons';

const Library = ({ layers, dispatch }) => {
  const [libraryActive, setLibraryState] = useState(true);
  const [uploaderState, setUploaderState] = useState(false);
  const [filter, setFilter] = useState('');

  const handleFilter = ({ target: { value } }) => setFilter(value);
  const feeds = layers.filter(layer => layer.type === 'feed');

  return (
    <Fragment>
      {uploaderState && (
        <Uploader dispatch={dispatch} setUploaderState={setUploaderState} />
      )}
      <div
        id="library"
        className={`panel ${libraryActive ? 'open' : 'closed'}`}
      >
        <div className="section search">
          <label htmlFor="search">Filter</label>
          <div className="searchBar">
            <span className="input-icon-wrapper">
              <input
                placeholder="Type to filter list by name or tag"
                type="input"
                name="search"
                id="search"
                onChange={handleFilter}
              />
              <FontAwesomeIcon icon={faFilter} />
            </span>
          </div>
        </div>
        <div className="scroll">
          <div className="section feeds">
            <Feeds feeds={feeds} dispatch={dispatch} filter={filter} />
          </div>
          <div className="section shapes">
            <Overlays filter={filter} />
          </div>
        </div>
        <div className="panel-tab library-tab">
          <button onClick={() => setLibraryState(!libraryActive)}>
            <FontAwesomeIcon icon={faList} />
          </button>
        </div>
      </div>
    </Fragment>
  );
};

export default Library;
