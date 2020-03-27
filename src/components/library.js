import React from 'react';
import ReactDOM from 'react-dom';
import Feeds from './feeds';
import Shapes from './layers';
import { useUser } from '../context/user-context';
import { useMap } from '../context/map-context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList, faFilter } from '@fortawesome/free-solid-svg-icons';

const Library = () => {
  const user = useUser();

  return (
    <div id="library">
      <div className="section search">
        <label htmlFor="search">Filter</label>
        <span className="input-icon-wrapper">
          <input
            placeholder="Type to filter list by name or tag"
            type="input"
            name="search"
            id="search"
          />
          <FontAwesomeIcon icon={faFilter} />
        </span>
      </div>
      <div className="scroll">
        <div className="section feeds">
          <Feeds />
        </div>
        <div className="section shapes">
          <Shapes />
        </div>
      </div>
      <div className="panel-tab library-tab">
        <button>
          <FontAwesomeIcon icon={faList} />
        </button>
      </div>
    </div>
  );
};

export default Library;
