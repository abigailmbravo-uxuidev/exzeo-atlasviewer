import React, { createContext, useContext, useEffect, useReducer } from 'react';
import { useUser } from './user-context';

const LayerStateContext = createContext();
const LayerDispatchContext = createContext();

const layerReducer = (layers, action) => {
  switch (action.type) {
    case 'initial': {
      return action.data;
    }
    case 'add': {
      return [...layers, action.data];
    }
    case 'update': {
      return layers.map(l => {
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

const LayerProvider = ({ children }) => {
  const { layers } = useUser();
  const [state, dispatch] = useReducer(layerReducer);

  useEffect(() => {
    if (layers && layers.length > 0) {
      dispatch({ type: 'initial', data: layers });
    }
  }, [layers]);

  return (
    <LayerStateContext.Provider value={state}>
      <LayerDispatchContext.Provider value={dispatch}>
        {children}
      </LayerDispatchContext.Provider>
    </LayerStateContext.Provider>
  );
};

const useLayerDispatch = () => {
  const context = React.useContext(LayerDispatchContext);
  if (context === undefined) {
    //throw new Error(`useLayerDispatch must be used within a LayerProvider`);
  }
  return context;
};

const useLayerState = () => {
  const context = useContext(LayerStateContext);
  if (context === undefined) {
    //throw new Error(`useLayerState must be used within a LayerProvider`);
  }
  return context;
};

export { LayerProvider, useLayerDispatch, useLayerState };
