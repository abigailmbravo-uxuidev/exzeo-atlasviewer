import React, { forwardRef, useRef, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Controller, useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faNetworkWired,
  faTimes,
  faPlus
} from '@fortawesome/free-solid-svg-icons';
import Table from './table';
import Autocomplete from './autocomplete';
import Checkbox from './checkbox';
import { useUser } from '../context/user-context';

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
  const [selectedRows, setSelectedRows] = useState([]);
  const [shareList, setShareList] = useState([]);
  const [previousShares, setPreviousShare] = useState([]);
  const [userList, setUserList] = useState([]);
  const { user_id, first_name, last_name } = useUser();

  useEffect(() => {
    const url = `${process.env.API_URL}/api/shares/${_id}`;
    const fetchUsers = async () => {
      const {
        data: { users = [], shares = [] }
      } = await axios(url);

      setUserList(users);
      setPreviousShare(shares);
    };

    fetchUsers();
  }, [_id]);

  const handleShare = async () => {
    if (shareList.length < 1) return;

    const url = `${process.env.API_URL}/api/share`;
    console.log('sharing...');
    const reqOptions = {
      url,
      method: 'POST',
      data: {
        feed,
        users: shareList
      }
    };

    try {
      const res = await axios(reqOptions);
      const result = res.data.data;

      setShareFeed();
    } catch (err) {
      setShareFeed();
      return setError(err.message);
    }
  };

  const handleAdd = ({ recipient }) => {
    if (shareList.includes(recipient)) {
      setSubmitting(false);
      return;
    }
    if (!recipient || !recipient.includes('|')) return;
    const parts = recipient.split('|');
    setShareList([parts[1], ...shareList]);
    setUserList(userList.filter(user => !user.includes(recipient)));
    reset({});
  };

  const handleRemove = email => {
    setUserList([email, ...userList]);
    setShareList(shareList.filter(share => !share.includes(email)));
  };

  const columns = React.useMemo(
    () => [
      { Header: 'User', accessor: 'share' },
      { Header: 'Invited', accessor: 'created_at' },
      { Header: 'Last Viewed', accessor: 'updated_at' },
      {
        id: 'selection',
        Header: ({ getToggleAllRowsSelectedProps }) => (
          <div>
            <Checkbox {...getToggleAllRowsSelectedProps()} indeterminate />
          </div>
        ),
        Cell: ({ row }) => (
          <div>
            <Checkbox {...row.getToggleRowSelectedProps()} />
          </div>
        )
      }
    ],
    []
  );

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
          <Controller
            as={Autocomplete}
            control={control}
            name="recipient"
            items={userList}
            defaultValue=""
            isSubmitting={isSubmitting}
          />
          <button
            className="secondaryActionBtn inputBtn"
            type="submit"
            enabled={String(dirty)}
          >
            <FontAwesomeIcon icon={faPlus} />
          </button>
          <button
            className="actionBtn"
            type="button"
            onClick={() => handleShare()}
          >
            Import
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
          <div className="shared-to-table">
            <Table
              columns={columns}
              data={previousShares}
              selectedRows={selectedRows}
              setSelectedRows={setSelectedRows}
            />
          </div>
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
