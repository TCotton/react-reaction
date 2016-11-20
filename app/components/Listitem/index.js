/* eslint-disable react/prop-types */

import React from 'react';
import classnames from 'classnames';

import styles from './_ListItem.scss';

import star from './images/star.svg';
import fork from './images/repo-forked.svg';
import linkExternal from './images/link-external.svg';

import H3 from '../../components/h3';
import IMG from '../../components/Img';

const stars = classnames(styles['stars']);
const forked = classnames(styles['forked']);
const externalLinks = classnames('octicon', styles['external-link']);

function ListItem(props) {

  const _populateLink = function _populateLink(item) {
    return item['homepage'] ? item['homepage'] : item['html_url'];
  };

  const _render = () => {

    if (props.items) {

      const returnedItem = props.items.map((item) => {

        const externalPage = _populateLink(item);

        return (

          <section className={styles['list-section']} key={item.id}>

            <div className={styles['list-section-left-column']}>

              <div className={stars}>
                <a href={externalPage}>

                  <span className={styles['side-icon']}>
                    <IMG src={star} alt='' className={'octicon'} />
                  </span>

                  <span className={styles['side-link']}>
                    {item['forks_count']}
                  </span>

                </a>
              </div>

              <div className={forked}>
                <a href={externalPage}>

                  <span className={styles['side-icon']}>
                    <IMG src={fork} alt='' className={'octicon'} />
                  </span>

                  <span className={styles['side-link']}>
                    {item['stargazers_count']}
                  </span>

                </a>
              </div>

            </div>

            <div className={styles['list-section-right-column']}>
              <a href={externalPage} target='_blank'>
                <H3>{item['full_name']}
                  <IMG src={linkExternal} alt={item['name']} className={externalLinks} />
                </H3>
              </a>
              <p>{item.description}</p>
            </div>

          </section>

        );

      });

      return <div>{returnedItem}</div>;

    }

    return <div></div>;
  };

  return _render();
}

export default ListItem;
