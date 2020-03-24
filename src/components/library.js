import React from 'react';
import ReactDOM from 'react-dom';
import FileProcessor from './file-processor';
import { useUser } from '../context/user-context';
import { useMap } from '../context/map-context';

const Library = () => {
  const user = useUser();

  return (
    <div id="library">
      <div className="section">
        <h2>Data Feeds</h2>
        <ul>
          {user &&
            user.dataSets.map((dataSet, index) => (
              <li key={dataSet._id}>{dataSet.name}</li>
            ))}
        </ul>
        <div>
          <FileProcessor />
        </div>
      </div>
    </div>
  );
};

export default Library;
