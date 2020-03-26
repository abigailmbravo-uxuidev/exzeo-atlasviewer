import React from 'react';
import ReactDOM from 'react-dom';
import Feeds from './feeds';
import Shapes from './layers';
import { useUser } from '../context/user-context';
import { useMap } from '../context/map-context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList } from '@fortawesome/free-solid-svg-icons';

const Library = () => {
  const user = useUser();

  return (
    <React.Fragment>
      <div id="library">
        <div className="section search">
          <label htmlFor="search">Filter</label>
          <input
            placeholder="Type To Filter By Name Or Meta Data"
            type="input"
            name="search"
            id="search"
          />
        </div>
        <div className="scroll">
          <div className="section feeds">
            <Feeds />
          </div>
          <div className="section shapes">
            <Shapes />
          </div>
        </div>
      </div>
      <div className="panel-tab library-tab">
        <button>
          <FontAwesomeIcon icon={faList} />
        </button>
      </div>
    </React.Fragment>
  );
};

export default Library;
