import React, { createContext, useContext, useEffect, useState } from 'react';
import createAuthClient from '@auth0/auth0-spa-js';
import PropTypes from 'prop-types';
import axios from 'axios';

const DEFAULT_REDIRECT_CALLBACK = () =>
  window.history.replaceState({}, document.title, window.location.pathname);

const AuthContext = createContext();

const AuthProvider = ({
  children,
  onRedirectCallback = DEFAULT_REDIRECT_CALLBACK,
  ...initOptions
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState();
  const [user, setUser] = useState();
  const [auth0Client, setAuth] = useState();
  const [loading, setLoading] = useState(true);
  const [popupOpen, setPopupOpen] = useState(false);

  useEffect(() => {
    const fetchUserData = async id => {
      const opts = {
        url: `${process.env.API_URL}/userdata/${id}`,
        method: 'GET'
      };
      const res = await axios(opts).catch(err => console.log(err));
      return res.data.data;
    };

    const initAuth = async () => {
      const auth0FromHook = await createAuthClient(initOptions);
      setAuth(auth0FromHook);

      if (
        window.location.search.includes('code=') &&
        window.location.search.includes('state=')
      ) {
        const { appState } = await auth0FromHook.handleRedirectCallback();
        onRedirectCallback(appState);
      }

      const isAuthenticated = await auth0FromHook.isAuthenticated();

      setIsAuthenticated(isAuthenticated);

      if (isAuthenticated) {
        const token = await auth0FromHook.getTokenSilently();
        const user = await auth0FromHook.getUser();
        axios.defaults.headers.common.authorization = `Bearer ${token}`;

        const userData = await fetchUserData(user.sub);
        userData.token = token;
        setUser(userData);
      }

      setLoading(false);
    };
    initAuth();
    // eslint-disable-next-line
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        loading,
        loginWithRedirect: (...p) => auth0Client.loginWithRedirect(...p),
        logout: () => auth0Client.logout({ redirectTo: process.env.URL })
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.object,
  onRedirectCallback: PropTypes.func
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
