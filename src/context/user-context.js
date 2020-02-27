import React from 'react';
import user from '../../test-data/user.json';

const UserContext = React.createContext();

function UserProvider(props) {
  return <UserContext.Provider value={user} {...props} />;
}

function useUser() {
  const context = React.useContext(UserContext);
  if (context === undefined) {
    throw new Error(`useUser must be used within a UserProvider`);
  }
  return context;
}

export { UserProvider, useUser };
