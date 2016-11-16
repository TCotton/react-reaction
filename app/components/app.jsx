import React from 'react';
import classnames from 'classnames';

import styles from './_index.scss';
import star from './images/star.svg';
import fork from './images/repo-forked.svg';

export default function App() {

  const wrapper = classnames(styles['wrapper']);
  const stars = classnames(styles['stars']);
  const forked = classnames(styles['forked']);

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

            <div className={stars}>
              <img src={star} alt='' />
            </div>
            <div className={forked}>
              <img src={fork} alt='' />
            </div>

          </div>
          <div className={styles['list-section-right-column']}>
            <h3>React component title</h3>
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
          </div>

        </section>

        <section className={styles['list-section']}>

          <div className={styles['list-section-left-column']}>

            <div className={stars}>
              <img src={star} alt='' />
            </div>
            <div className={forked}>
              <img src={fork} alt='' />
            </div>

          </div>
          <div className={styles['list-section-right-column']}>
            <h3>React component title</h3>
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
          </div>

        </section>

        <section className={styles['list-section']}>

          <div className={styles['list-section-left-column']}>

            <div className={stars}>
              <img src={star} alt='' />
            </div>
            <div className={forked}>
              <img src={fork} alt='' />
            </div>

          </div>
          <div className={styles['list-section-right-column']}>
            <h3>React component title</h3>
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
          </div>

        </section>

      </div>

    </div>
  );
}

