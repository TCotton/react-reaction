import React from 'react';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import styles from './_admin.scss';
import stylesTwo from './testing.css';
import H1 from '../../components/h1';

function Admin() {

  return (
    <div className='admin'>
      <div className={styles['admin-index']}>
        <H1><FormattedMessage {...messages.title} /></H1>
        <ul>
          <li>
            <Link to='/admin/signup'>
              <FormattedMessage {...messages.linkSignUp} />
            </Link>
          </li>
          <li>
            <Link to='/admin/exclude'>
              <FormattedMessage {...messages.linkManagePopularList} />
            </Link>
          </li>
          <li>
            <Link to='/admin/include'>
              <FormattedMessage {...messages.addItemsBack} />
            </Link>
          </li>
          <li>
            <Link to='/admin/signout'>
              <FormattedMessage {...messages.linkSignOut} />
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );

}

export default Admin;

