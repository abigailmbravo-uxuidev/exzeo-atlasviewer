import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faNetworkWired,
  faTimes,
  faPlus
} from '@fortawesome/free-solid-svg-icons';

const Uploader = () => {
  return (
    <div className="modal fade-in feedManager-modal">
      <form className="card">
        <header>
          <h4>
            <FontAwesomeIcon icon={faNetworkWired} />
            &nbsp;Data Feed Share Manager
            <span>&nbsp;|&nbsp;[Feed Name]</span>
          </h4>
          <button className="iconBtn closeBtn" type="button">
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </header>
        <div className="body">
          <section className="addUsers">
            <input
              placeholder="Enter email address(es)"
              type="input"
              name="add"
              id="add"
              className="withBtn"
            />
            <button className="secondaryActionBtn inputBtn" type="submit">
              <FontAwesomeIcon icon={faPlus} />
            </button>
            <button className="secondaryActionBtn">Import</button>
          </section>
          <section className="usersQueued">
            <div className="userQueue">
              <div className="label">Users Added</div>
              {/* Start loop of queued users __________________________________________________________________ */}
              <span>
                testemail@exzeo.com
                <button className="iconBtn dark">
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              </span>
              {/* End loop of queued users __________________________________________________________________ */}
            </div>
          </section>
          <section className="emailMessage">
            <div className="label">
              Users Will Be Emailed The Following Message
              <div className="checkbox-wrapper">
                <label htmlFor="surpressEmail">Don't send email</label>
                <input
                  type="checkbox"
                  id="surpressEmail"
                  name="surpressEmail"
                ></input>
              </div>
            </div>
            <textarea rows="4">
              Hello! GIS TEAM wants to share maps and data with you. Atlas
              Viewer, a cloud-based mapping tool, makes the location-based data
              in [FEED NAME] come to life!
            </textarea>
          </section>
        </div>
        <footer>
          <button className="secondaryBtn" type="button">
            Reset
          </button>
          <button className="actionBtn" type="submit">
            Send Invite
          </button>
        </footer>
        <div className="body"></div>
      </form>
    </div>
  );
};

export default Uploader;
