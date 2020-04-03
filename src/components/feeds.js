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
      <ul className="panel-list">
        {filteredDatasets &&
          filteredDatasets.map((layer, index) => (
            <li key={layer.id}>
              <h3>{layer.name}</h3>
              <dl>
                <span className="date">
                  <dt>Created</dt>
                  <dd>{layer.created_at}</dd>
                </span>
                <span className="date">
                  <dt>Updated</dt>
                  <dd>{layer.updated_at}</dd>
                </span>
                <span>
                  <dt>Author</dt>
                  <dd>{layer.owner.name}</dd>
                </span>
              </dl>
            </li>
          ))}
      </ul>
    </React.Fragment>
  );
};

export default Feeds;
