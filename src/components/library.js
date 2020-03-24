import React from 'react';
import ReactDOM from 'react-dom';
import Feeds from './feeds';
import Shapes from './shapes';
import FileProcessor from './file-processor';
import { useUser } from '../context/user-context';
import { useMap } from '../context/map-context';

const Library = () => {
  const user = useUser();

  return (
    <div id="library">
      <div className="section search">
        <label htmlFor="search">Filter By Name Or Meta Data</label>
        <input type="input" name="search" id="search" />
      </div>
      <div className="section feeds">
        <Feeds />
        <FileProcessor />
      </div>
      <div className="section shapes">
        <Shapes />
      </div>
    </div>
  );
};

export default Library;
