import React from 'react';
import PropTypes from 'prop-types';

const Modal = ({ message, closeModal, title = 'Error' }) => {
  return (
    <div className="modal fade-in">
      <header>
        <h4>{title}</h4>
      </header>
      <div className="body">{message}</div>
      <footer>
        <button className="actionBtn" type="button" onClick={closeModal}>
          Close
        </button>
      </footer>
    </div>
  );
};

Modal.propTypes = {
  message: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
  title: PropTypes.string
};

export default Modal;
