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
import Autocomplete from './autocomplete';
import { useUser } from '../context/user-context';

const ShareFeed = ({ feed, setShareFeed, setError }) => {
  const { name } = feed;
  const {
    control,
    defaultValues,
    errors,
    formState: { dirty },
    handleSubmit,
    register,
    reset
  } = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: { recipient: '' }
  });
  const [submitting, setSubmitting] = useState(false);
  const [shareList, setShareList] = useState([]);
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

  const handleShare = ({ recipient }) => {
    setSubmitting(true);
    if (shareList.includes(recipient)) {
      setSubmitting(false);
      return;
    }
    if (!recipient || !recipient.includes('|')) return;
    const parts = recipient.split('|');
    setShareList([parts[1], ...shareList]);
    setUserList(userList.filter(user => !user.includes(recipient)));
    reset({});
    setSubmitting(false);
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
      <form className="card share" onSubmit={handleSubmit(handleShare)}>
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
            isSubmitting={submitting}
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
            onClick={() => console.log('test')}
          >
            Import
          </button>
          {errors.lastname && 'Feed Name is required.'}
        </div>
        <footer></footer>
      </form>
      <ul>
        {shareList.map(share => (
          <span key={share}>{share}</span>
        ))}
      </ul>
      <div>
        <Table columns={columns} data={[]} />
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
