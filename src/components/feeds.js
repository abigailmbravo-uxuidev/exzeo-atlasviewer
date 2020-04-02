import React from 'react';
import { useLayerState } from '../context/layer-context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faNetworkWired } from '@fortawesome/free-solid-svg-icons';

const Feeds = ({ filter }) => {
  const { datasets } = useLayerState();
  const filteredDatasets = datasets.filter(ds => {
    return ds.name.toLowerCase().includes(filter);
  });

  return (
    <React.Fragment>
      <header>
        <h4>
          <FontAwesomeIcon icon={faNetworkWired} />
          &nbsp;Data Feed
        </h4>
      </header>
      <ul>
        {filteredDatasets &&
          filteredDatasets.map((layer, index) => (
            <li key={layer.id}>
              <div>{layer.name}</div>
              <div>
                <span>Created</span>
                {layer.created_at}
              </div>
              <div>
                <span>Updated</span>
                {layer.updated_at}
              </div>
              <div>
                <span>Author</span>
                {layer.owner.name}
              </div>
            </li>
          ))}
      </ul>
    </React.Fragment>
  );
};

export default Feeds;
