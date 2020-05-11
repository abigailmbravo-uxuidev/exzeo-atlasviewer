import React from 'react';
import { useAuth } from './auth-context';
import userData from '../../test-data/user.json';

const UserContext = React.createContext();

function UserProvider(props) {
  const { user, isAuthenticated } = useAuth();
  const userProfile = user || { layers: [] };

  return <UserContext.Provider value={userProfile} {...props} />;
}

function useUser() {
  const context = React.useContext(UserContext);
  if (context === undefined) {
    throw new Error(`useUser must be used within a UserProvider`);
  }
  return context;
}

export { UserProvider, useUser };
