/* eslint-disable arrow-body-style */
import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import classnames from 'classnames';

import ACTIONS from '../actions/actions';

import styles from './_index.scss';
import star from './images/star.svg';
import fork from './images/repo-forked.svg';

const wrapper = classnames(styles['wrapper']);

const stars = classnames(styles['stars']);
const forked = classnames(styles['forked']);

class Frontpage extends Component {

  static propTypes = {
    fetchGitHubData: PropTypes.func,
    popular: PropTypes.array
  };

  componentWillMount() {
    this.props.fetchGitHubData();
  }

  renderContent() {

    if (this.props.popular) {

      return this.props.popular.map((item) => {

        return (

          <section className={styles['list-section']} key={item.id}>

            <div className={styles['list-section-left-column']}>

              <div className={stars}>
                <a href={item.homepage}>

                  <span className={styles['side-icon']}>
                    <img src={star} alt='' className={'octicon'} />
                  </span>

                  <span className={styles['side-link']}>
                    {item['forks_count']}
                  </span>

                </a>
              </div>

              <div className={forked}>
                <a href={item.homepage}>

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
              <h3>{item['full_name']}</h3>
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

          <h1>React Reaction</h1>

          <p>The most popular React third-party libraries on GitHub as ordered by stars</p>
          <p>This list also includes libraries commonly associated with React, such as Redux</p>

        </div>

        <div className={styles['right-column']}>

          <h2>Popular React libraries</h2>

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
