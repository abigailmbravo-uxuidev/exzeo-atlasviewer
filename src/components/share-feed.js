import React, { forwardRef, useRef, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Controller, useForm } from 'react-hook-form';
import { format } from 'date-fns-tz';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faNetworkWired,
  faTimes,
  faPlus,
  faBan
} from '@fortawesome/free-solid-svg-icons';
import Table from './table';
import { useUser } from '../context/user-context';

const formatData = shares =>
  shares.map(share => ({
    viewed: share.viewed
      ? format(new Date(share.viewed), 'MM-dd-yyyy h:mm a', {
          timeZone: 'America/New_York'
        })
      : 'Never',
    ...share,
    created_at: format(new Date(share.created_at), 'MM/dd/yyyy h:mm a', {
      timeZone: 'America/New_York'
    })
  }));

const ShareFeed = ({ feed, setShareFeed, setError }) => {
  const { _id, name } = feed;
  const {
    control,
    defaultValues,
    errors,
    formState: { dirty, isSubmitting },
    handleSubmit,
    register,
    reset
  } = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: { recipient: '' }
  });
  const [selectedRows, setSelectedRows] = useState({});
  const [shareList, setShareList] = useState([]);
  const [previousShares, setPreviousShare] = useState([]);
  const { user_id, first_name, last_name } = useUser();

  const columns = useMemo(
    () => [
      { Header: 'User', accessor: 'share', sortType: 'basic' },
      { Header: 'Invited', accessor: 'created_at', sortType: 'basic' },
      { Header: 'Last Viewed', accessor: 'viewed', sortType: 'basic' }
    ],
    []
  );

  useEffect(() => {
    const url = `${process.env.API_URL}/api/shares/${_id}`;
    const fetchUsers = async () => {
      const {
        data: { shares = [] }
      } = await axios(url);
      setPreviousShare(formatData(shares));
    };

    fetchUsers();
  }, [_id]);

  const handleShare = async () => {
    if (shareList.length < 1) return;

    const url = `${process.env.API_URL}/api/share`;
    const reqOptions = {
      url,
      method: 'POST',
      data: {
        feed,
        shares: shareList
      }
    };

    try {
      const { data } = await axios(reqOptions);
      const shares = formatData(data.result);
      setPreviousShare([...shares, ...previousShares]);
      setShareList([]);
    } catch (err) {
      setShareFeed();
      return setError(err.message);
    }
  };

  const handleAdd = ({ recipients }) => {
    const list = recipients.split();
    const emails = list.filter(email => {
      const shareExists = previousShares.some(
        prev => prev.share === email.trim()
      );
      return !shareList.includes(email) && !shareExists;
    });
    setShareList([...emails, ...shareList]);
    reset({});
  };

  const handleRemove = email => {
    setShareList(shareList.filter(share => !share.includes(email)));
  };

  const handleRevoke = async () => {
    const ids = selectedRows.map(row => row.original._id);
    const url = `${process.env.API_URL}/api/share/delete/${ids.join()}`;

    try {
      await axios.delete(url);
    } catch (err) {
      return setError(err.message);
    }
  };

  return (
    <div className="modal fade-in">
      <form className="card share" onSubmit={handleSubmit(handleAdd)}>
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
            id="recipients"
            name="recipients"
            defaultValue=""
            ref={register({ required: true })}
          />
          <button
            className="secondaryActionBtn inputBtn"
            type="submit"
            enabled={String(dirty)}
          >
            <FontAwesomeIcon icon={faPlus} />
          </button>
          {errors.lastname && 'Feed Name is required.'}
        </div>
        <div className="feed-share-results">
          <h5>Users Added</h5>
          <div className="name-chips">
            {shareList.map((share, index) => (
              <span key={share}>
                {share}
                <span
                  className="remove-icon"
                  role="button"
                  tabIndex={index}
                  onKeyPress={() => handleRemove(share)}
                  onClick={() => handleRemove(share)}
                >
                  <FontAwesomeIcon icon={faTimes} />
                </span>
              </span>
            ))}
          </div>
          <div className="share-modal-btns">
            <button
              className="reset"
              disabled={shareList.length < 1}
              onClick={() => setShareList([])}
            >
              Reset
            </button>
            <button
              className="actionBtn send"
              type="button"
              onClick={() => handleShare()}
            >
              Share
            </button>
          </div>
          <div className="shared-to-table">
            <Table
              columns={columns}
              data={previousShares}
              setSelectedRows={setSelectedRows}
            />
          </div>
        </div>
        <footer>
          <button type="button" onClick={() => handleRevoke()}>
            <FontAwesomeIcon icon={faBan} /> Revoke selected
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
