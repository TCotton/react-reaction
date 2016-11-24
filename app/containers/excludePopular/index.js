import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import momentJS from 'moment';
import classnames from 'classnames';

import ACTIONS from '../../actions/actions';

import H2 from '../../components/h2';
import H3 from '../../components/h3';

import styles from './_excludePopular.scss';

const adminExclPop = classnames('admin', styles.list);

class ExcludePopular extends Component {

  static propTypes = {
    fetchGitHubData: PropTypes.func,
    popular: PropTypes.array
  };

  constructor(props) {
    super(props);
    this.displayPopularGithubList = this.displayPopularGithubList.bind(this);
  }

  componentWillMount() {
    this.props.fetchGitHubData();
  }

  formatDate(dateString) {
    return momentJS(dateString).format('MMM Do YYYY');
  }

  displayPopularGithubList() {

    if (this.props.popular) {
      /* eslint-disable max-len, arrow-body-style */
      return this.props.popular.map((item, index) => {
        if (index < 5) {
          return (
            <dl key={item.id}>

              <dt>Full name: <span className={styles['highlight']}>{item['full_name']}</span> / Short name: <span className={styles['highlight']}>{item['name']}</span></dt>

              <dd>Owner: <a href={item.owner['html_url']} target='_blank' className={styles['highlight']}>{item.owner.login}</a>
                &nbsp;/ Owner type: <span className={styles['highlight']}>{item.owner.type}</span>
                &nbsp;/ Owner ID: <span className={styles['highlight']}>{item.owner.id}</span></dd>

              <dd>GitHub link: <a href={item['html_url']} target='_blank' className={styles['highlight']}>{item['html_url']}</a></dd>

              <dd>Description: <span className={styles['highlight']}>{item.description}</span></dd>

              <dd>Stars: <span className={styles['highlight']}>{item['stargazers_count']}</span></dd>

              <dd>Forks: <span className={styles['highlight']}>{item['forks_count']}</span></dd>

              <dd>Language: <span className={styles['highlight']}>{item['language']}</span></dd>

              <dd>Date created: <span className={styles['highlight']}>{this.formatDate(item['created_at'])}</span></dd>

              <dd>Date updated: <span className={styles['highlight']}>{this.formatDate(item['updated_at'])}</span></dd>

            </dl>
          );
        }
      });

    }

    return <H3 className={styles['loading']}>Loading...</H3>;

  }

  render() {

    return (
      <div className={adminExclPop}>
        <H2 className={styles['exclude-popular-header']}>Exclude projects from GitHub most popular React projects list</H2>
        <section className={styles['list-item']}>
          {this.displayPopularGithubList()}
        </section>
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

export default connect(mapStateToProps, mapDispatchToProps)(ExcludePopular);
