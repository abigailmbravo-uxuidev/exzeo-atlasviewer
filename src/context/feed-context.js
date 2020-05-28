import React, { createContext, useContext, useEffect, useReducer } from 'react';
import { useUser } from './user-context';

const FeedStateContext = createContext();
const FeedDispatchContext = createContext();

const feedReducer = (feeds, action) => {
  switch (action.type) {
    case 'initial': {
      return action.data;
    }
    case 'add': {
      return [...feeds, action.data];
    }
    case 'update': {
      return feeds.map(l => {
        if (l._id === action.data._id) {
          return { ...l, ...action.data };
        }
        return l;
      });
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
};

const FeedProvider = ({ children }) => {
  const { feeds = [] } = useUser();
  const [state, dispatch] = useReducer(feedReducer, feeds);

  useEffect(() => {
    if (feeds && feeds.length > 0) {
      dispatch({ type: 'initial', data: feeds });
    }
  }, [feeds]);

  return (
    <FeedStateContext.Provider value={state}>
      <FeedDispatchContext.Provider value={dispatch}>
        {children}
      </FeedDispatchContext.Provider>
    </FeedStateContext.Provider>
  );
};

const useFeedDispatch = () => {
  const context = React.useContext(FeedDispatchContext);
  if (context === undefined) {
    //throw new Error(`useFeedDispatch must be used within a FeedProvider`);
  }
  return context;
};

const useFeedState = () => {
  const context = useContext(FeedStateContext);
  if (context === undefined) {
    //throw new Error(`useFeedState must be used within a FeedProvider`);
  }
  return context;
};

export { FeedProvider, useFeedDispatch, useFeedState };
