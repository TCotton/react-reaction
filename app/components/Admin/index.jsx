import React from 'react';
import { Link } from 'react-router';
import styles from './_admin.scss';
import H1 from '../../components/h1';

function Admin() {

  return (
    <div className='admin'>
      <div className={styles['admin-index']}>
        <H1>Admin area</H1>
        <ul>
          <li>
            <Link to='/admin/signup'>Sign Up</Link>
          </li>
        </ul>
      </div>
    </div>
  );

}

export default Admin;

