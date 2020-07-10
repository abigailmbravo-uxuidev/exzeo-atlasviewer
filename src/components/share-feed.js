import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faNetworkWired,
  faTimes,
  faPlus
} from '@fortawesome/free-solid-svg-icons';

const ShareFeed = ({ feed, setShareFeed, setError }) => {
  const { name } = feed;
  const { getValues, register, handleSubmit, errors, formState } = useForm();
  const [recipientList, setRecipientList] = useState([]);

  const handleAdd = entity => {
    console.log(getValues('recipient'));
    setRecipientList([entity, ...recipientList]);
  };
  const handleShare = entity => {
    console.log(entity);
  };

  return (
    <div className="modal fade-in">
      <form className="card" onSubmit={handleSubmit(handleShare)}>
        <header>
          <h4>
            <FontAwesomeIcon icon={faNetworkWired} />
            &nbsp;Data Feed Share Manager | {name}
          </h4>
          <button
            className="iconBtn closeBtn"
            type="button"
            onClick={() => setShareFeed()}
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </header>
        <div className="body">
          <input
            type="text"
            id="recipient"
            name="recipient"
            placeholder="Add"
            ref={register({
              required: true,
              pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            })}
          />
          <button
            className="secondaryActionBtn inputBtn"
            type="button"
            onClick={e => handleAdd(e)}
          >
            <FontAwesomeIcon icon={faPlus} />
          </button>
          <button
            className="actionBtn"
            type="submit"
            enabled={String(formState.dirty)}
          >
            Import
          </button>
          {errors.lastname && 'Feed Name is required.'}
        </div>
        <footer></footer>
      </form>

    </div>
  );
};

ShareFeed.propTypes = {
  feed: PropTypes.object.isRequired,
  setShareFeed: PropTypes.func.isRequired,
  setError: PropTypes.func.isRequired
};

export default ShareFeed;
