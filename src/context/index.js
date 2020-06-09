import React from 'react';
import PropTypes from 'prop-types';
import { AuthProvider } from './auth-context';
import { UserProvider } from './user-context';

function AppProviders({ children }) {
  return (
    <AuthProvider
      domain={process.env.AUTH0_DOMAIN}
      audience={process.env.AUTH0_AUDIENCE}
      client_id={process.env.AUTH0_CLIENT_ID}
      redirect_uri={`${process.env.URL}/map`}
    >
      <UserProvider>{children}</UserProvider>
    </AuthProvider>
  );
}

AppProviders.propTypes = {
  children: PropTypes.node
};

export default AppProviders;
