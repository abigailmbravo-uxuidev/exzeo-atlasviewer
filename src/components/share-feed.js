import React, { useEffect, useMemo, useState } from 'react';
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
import autocomplete from './autocomplete';
import { useUser } from '../context/user-context';

const ShareFeed = ({ feed, setShareFeed, setError }) => {
  const { name } = feed;
  const {
    control,
    errors,
    formState,
    getValues,
    handleSubmit,
    register,
    reset
  } = useForm();
  const [recipientList, setRecipientList] = useState([]);
  const [userList, setUserList] = useState([]);
  const { user_id } = useUser();

  useEffect(() => {
    const url = `${process.env.API_URL}/api/users/${user_id}`;
    const fetchUsers = async () => {
      const { data } = await axios(url);

      setUserList(data);
    };

    fetchUsers();
  }, [user_id]);

  const handleAdd = () => {
    const recipient = getValues('recipient');
    setRecipientList([recipient, ...recipientList]);
    reset();
  };
  const handleShare = entity => {
    console.log(entity);
  };

  const columns = React.useMemo(
    () => [
      { Header: 'User', accessor: 'user' },
      { Header: 'Invited', accessor: 'created_at' },
      { Header: 'Last Viewed', accessor: 'updated_at' }
    ],
    []
  );

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
          <Controller
            as={autocomplete}
            control={control}
            name="recipient"
            items={userList}
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
      <div>
        <Table columns={columns} data={recipientList} />
      </div>
    </div>
  );
};

ShareFeed.propTypes = {
  feed: PropTypes.object.isRequired,
  setShareFeed: PropTypes.func.isRequired,
  setError: PropTypes.func.isRequired
};

export default ShareFeed;
