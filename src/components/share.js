import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faNetworkWired, faTimes } from '@fortawesome/free-solid-svg-icons';

const handleShare = data => {
  console.log(data);
};

const Share = ({ data, setShareState, setError }) => {
  const { register, handleSubmit, errors, formState } = useForm();
  return (
    <div className="modal fade-in">
      <form className="card" onSubmit={handleSubmit(handleUpload)}>
        <header>
          <h4>
            <FontAwesomeIcon icon={faNetworkWired} />
            &nbsp;Data Feed Share Manager
          </h4>
          <button
            className="iconBtn closeBtn"
            type="button"
            onClick={() => setShareState(false)}
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
            className="secondaryBtn"
            type="button"
            onClick={() => setUploaderState(false)}
          >
            Cancel
          </button>
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

Share.propTypes = {
  data: PropTypes.object.isRequired,
  setShareState: PropTypes.func.isRequired,
  setError: PropTypes.func.isRequired
};

export default Share;
