import React from 'react';
import ReactDOM from 'react-dom';
import Spinner from './components/spinner';
import { useUser } from './context/user-context';
import AuthenticatedApp from './authenticated-app';
import UnauthenticatedApp from './components/landing';

const App = () => {
  const user = useUser()
  
  return (
    <React.Suspense fallback={<Spinner />}>
      {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </React.Suspense>
  )
};

export default App;
