import React from 'react';
import ReactDOM from 'react-dom';
import FileProcessor from './file-processor';
import { useUser } from '../context/user-context';
import { useMap } from '../context/map-context';

const Settings = () => {
  const user = useUser();

  return (
    <div id="settings">
      <h1>Settings</h1>
      <div>
        <h2>Feeds</h2>
        <ul>
          {user &&
            user.dataSets.map((dataSet, index) => (
              <li key={dataSet._id}>{dataSet.name}</li>
            ))}
        </ul>
      </div>
      <div>
        <FileProcessor />
      </div>
    </div>
  );
};

export default Settings;
