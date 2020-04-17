import React, { useReducer, Fragment } from 'react';
import { LayerProvider } from '../context/layer-context';
import { useUser } from '../context/user-context';
import Header from './header';
import Map from './map';
import Library from './library';
import View from './view';

const layerReducer = (layers, action) => {
  switch (action.type) {
    case 'add': {
      return [...layers, action.layer];
    }
    case 'toggle': {
      return layers.filter(li => li.id !== action.id);
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
};

const Canvas = () => {
  const user = useUser();
  const [layers, dispatch] = useReducer(layerReducer, user.layers);

  return (
    <Fragment>
      <Library layers={layers} dispatch={dispatch} />
      <View />
      <div id="map-canvas">
        <Map />
      </div>
    </Fragment>
  );
};

export default Canvas;
