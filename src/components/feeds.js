import React from 'react';
import { useLayerState } from '../context/layer-context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faNetworkWired, faShareAlt } from '@fortawesome/free-solid-svg-icons';

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
        <div className="notification shared-feed"></div>
        {filteredDatasets &&
          filteredDatasets.map((layer, index) => (
            <li key={layer.id}>
              <h5>
                {/*icon should only show if feed is shared, should have new class until notification associated with it is dismissed*/}
                <span className="icon shared new">
                  <FontAwesomeIcon icon={faShareAlt} />
                </span>
                <span>
                  {/*friendly name and pipe only shows if added by user*/}
                  <strong>[FRIENDLY NAME]</strong>&nbsp;|&nbsp;
                  {/*end friendly name*/}
                  {layer.name}
                </span>
              </h5>
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
