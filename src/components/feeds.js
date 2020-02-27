import React from 'react';
import ReactDOM from 'react-dom';
import { useUser } from '../context/user-context';

const Feeds = () => {
  const user = useUser();
  return (
    <div id="feeds">
      <h2>Feeds</h2>
      <ul>
        {user &&
          user.dataSets.map((dataSet, index) => (
            <li key={dataSet._id}>{dataSet.name}</li>
          ))}
      </ul>
    </div>
  );
};

export default Feeds;
