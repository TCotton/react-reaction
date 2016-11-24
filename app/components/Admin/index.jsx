import React from 'react';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import styles from './_admin.scss';
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
        </ul>
      </div>
    </div>
  );

}

export default Admin;

