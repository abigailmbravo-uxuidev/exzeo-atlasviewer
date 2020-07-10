import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faNetworkWired, faTimes } from '@fortawesome/free-solid-svg-icons';

const handleShare = data => {
  console.log(data);
};

const ShareFeed = ({ feed, setShareFeed, setError }) => {
  const { register, handleSubmit, errors, formState } = useForm();
  return (
    <div className="modal fade-in">
      <form className="card" onSubmit={handleSubmit(handleShare)}>
        <header>
          <h4>
            <FontAwesomeIcon icon={faNetworkWired} />
            &nbsp;Data Feed Share Manager
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
            id="name"
            name="name"
            placeholder="Name"
            ref={register({ required: true })}
          />
          {errors.lastname && 'Feed Name is required.'}
        </div>
        <footer>
          <button
            className="actionBtn"
            type="submit"
            enabled={String(formState.dirty)}
          >
            Import
          </button>
        </footer>
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
