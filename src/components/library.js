import React, { useState, Fragment } from 'react';
import Feeds from './feeds';
import Overlays from './overlays';
import Uploader from './uploader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList, faFilter } from '@fortawesome/free-solid-svg-icons';

const Library = () => {
  const [libraryActive, setLibraryState] = useState(true);
  const [uploaderState, setUploaderState] = useState(false);
  const [filter, setFilter] = useState('');
  const handleFilter = ({ target: { value } }) => setFilter(value);

  return (
    <Fragment>
      {uploaderState && <Uploader />}
      <div
        id="library"
        className={`panel ${libraryActive ? 'open' : 'closed'}`}
      >
        <div className="section search">
          <label htmlFor="search">Filter</label>
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
          <button
            type="button"
            onClick={() => setUploaderState(!uploaderState)}
          >
            Upload
          </button>
        </div>
        <div className="scroll">
          <div className="section feeds">
            <Feeds filter={filter} />
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
