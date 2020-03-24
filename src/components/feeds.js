import React from 'react';
import ReactDOM from 'react-dom';
import { useUser } from '../context/user-context';

const Feeds = () => {
  const user = useUser();
  return (
    <React.Fragment>
      <header>
        <h4>Data Feeds</h4>
      </header>
      <ul>
        {user &&
          user.dataSets.map((dataSet, index) => (
            <li key={dataSet._id}>{dataSet.name}</li>
          ))}
      </ul>
    </React.Fragment>
  );
};

export default Feeds;
