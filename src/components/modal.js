import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const Modal = ({ message, closeModal, title = 'Error' }) => {
  return (
    <div className="modal fade-in">
      <div className="card error">
        <header>
          <h4>{title}</h4>
        </header>
        <div className="modal-message">{message}</div>
        <footer>
          <button className="actionBtn" type="button" onClick={closeModal}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </footer>
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
