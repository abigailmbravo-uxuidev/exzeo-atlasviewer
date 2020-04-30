import React from 'react';
import PropTypes from 'prop-types';
import { UserProvider } from './user-context';

function AppProviders({ children }) {
  return <UserProvider>{children}</UserProvider>;
}

AppProviders.propTypes = {
  children: PropTypes.node
};

export default AppProviders;
