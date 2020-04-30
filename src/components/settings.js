import React from 'react';
import ReactDOM from 'react-dom';
import Uploader from './uploader';
import { useUser } from '../context/user-context';
import { useMap } from '../context/map-context';

const Settings = () => {
  const user = useUser();

  return (
    <div id="settings">
      <h1>Settings</h1>
      <div>
        <h2>Feeds</h2>
      </div>
      <div>
        <Uploader />
      </div>
    </div>
  );
};

export default Settings;
