import React from 'react';
import classnames from 'classnames';

import styles from './_index.scss';

export default function App() {

  const wrapper = classnames(styles['wrapper'], 'whatever');

  return (

    <div className={wrapper}>

      <div className={styles['left-column']}>

        <h1>React Reaction</h1>

        <p>The most popular React third-party libraries on GitHub as ordered by stars</p>
        <p>This list also includes libraries commonly associated with React, such as Redux</p>

      </div>

      <div className={styles['right-column']}>

        <h2>Popular React libraries</h2>

        <section className={styles['list-section']}>

          <div className={styles['list-section-left-column']}>

            <div className={styles['stars']}>Stars</div>
            <div className={styles['weblink']}>Stars</div>

          </div>
          <div className={styles['list-section-right-column']}>
            <h3>React component title</h3>
            <p>Description</p>
          </div>

        </section>

      </div>

    </div>
  );
}

