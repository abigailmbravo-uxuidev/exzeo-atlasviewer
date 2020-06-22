import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTimes,
  faExclamationCircle
} from '@fortawesome/free-solid-svg-icons';

const Modal = ({ message, closeModal, title = 'Error' }) => {
  return (
    <div className="modal fade-in">
      <div className="card error">
        <header>
          <div className="error-header">
            <FontAwesomeIcon icon={faExclamationCircle} />
            <h4>{title}</h4>
          </div>
          <button className="actionBtn" type="button" onClick={closeModal}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </header>
        <div className="modal-message">{message}</div>
        <footer></footer>
      </div>
    </div>
  );
};

Modal.propTypes = {
  message: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
  title: PropTypes.string
};

export default Modal;
