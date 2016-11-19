/* eslint-disable arrow-body-style */
import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import classnames from 'classnames';

import ACTIONS from '../actions/actions';
import messages from './messages';

import styles from './_index.scss';
import star from './images/star.svg';
import fork from './images/repo-forked.svg';
import linkExternal from './images/link-external.svg';

const wrapper = classnames(styles['wrapper']);

const stars = classnames(styles['stars']);
const forked = classnames(styles['forked']);
const externalLinks = classnames('octicon', styles['external-link']);

class Frontpage extends Component {

  static propTypes = {
    fetchGitHubData: PropTypes.func,
    popular: PropTypes.array
  };

  componentWillMount() {
    this.props.fetchGitHubData();
  }

  populateLink(item) {
    return item['homepage'] ? item['homepage'] : item['html_url'];
  }

  renderContent() {

    if (this.props.popular) {

      return this.props.popular.map((item) => {

        const externalPage = this.populateLink(item);

        return (

          <section className={styles['list-section']} key={item.id}>

            <div className={styles['list-section-left-column']}>

              <div className={stars}>
                <a href={externalPage}>

                  <span className={styles['side-icon']}>
                    <img src={star} alt='' className={'octicon'} />
                  </span>

                  <span className={styles['side-link']}>
                    {item['forks_count']}
                  </span>

                </a>
              </div>

              <div className={forked}>
                <a href={externalPage}>

                  <span className={styles['side-icon']}>
                    <img src={fork} alt='' className={'octicon'} />
                  </span>

                  <span className={styles['side-link']}>
                    {item['stargazers_count']}
                  </span>

                </a>
              </div>

            </div>

            <div className={styles['list-section-right-column']}>
              <h3>{item['full_name']}
                <a href={externalPage} target='_blank' >
                  <img src={linkExternal} alt={item['name']} className={externalLinks} />
                </a>
              </h3>
              <p>{item.description}</p>
            </div>

          </section>

        );

      });

    }

    return null;

  }

  render() {

    return (

      <div className={wrapper}>

        <div className={styles['left-column']}>

          <h1>
            <FormattedMessage {...messages.title} />
          </h1>

          <p>
            <FormattedMessage {...messages.descriptionOne} />
          </p>
          <p>
            <FormattedMessage {...messages.descriptionTwo} />
          </p>

        </div>

        <div className={styles['right-column']}>

          <h2>
            <FormattedMessage {...messages.headerTwo} />
          </h2>

          {this.renderContent()}

        </div>

      </div>
    );

  }

}

function mapStateToProps(state) {
  return {
    popular: state.popular.results
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchGitHubData: ACTIONS.fetchGitHubData
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Frontpage);
