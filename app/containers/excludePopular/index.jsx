import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import momentJS from 'moment';
import classnames from 'classnames';
import { FormattedMessage } from 'react-intl';
import _ from 'lodash';
import ACTIONS from '../../actions/actions';
import messages from './messages';
import H2 from '../../components/h2';
import H3 from '../../components/h3';
import styles from './_excludePopular.scss';

const adminExclPop = classnames('admin', styles.list);

class ExcludePopular extends Component {

  static propTypes = {
    fetchGitHubData: PropTypes.func,
    popular: PropTypes.array
  };

  static checkboxFields() {

    if (this.props.popular) {

      return this.props.popular.map((item) => {

        return `${item.name}-${item.id}`;

      });

    }

    return null;

  }

  constructor(props) {
    super(props);
    this.displayPopularGithubList = this.displayPopularGithubList.bind(this);
    ExcludePopular.checkboxFields = ExcludePopular.checkboxFields.bind(this);
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
      return this.props.popular.map((item) => {

        return (
          <dl key={item.id}>

            <dt><FormattedMessage {...messages.fullName} />: <span className={styles['highlight']}>{item['full_name']}</span>&nbsp;
              /&nbsp;<FormattedMessage {...messages.shortName} />: <span className={styles['highlight']}>{item['name']}</span></dt>

            <dd><FormattedMessage {...messages.owner} />: <a href={item.owner['html_url']} target='_blank' className={styles['highlight']}>{item.owner.login}</a>
              &nbsp;/ <FormattedMessage {...messages.ownerType} />: <span className={styles['highlight']}>{item.owner.type}</span>
              &nbsp;/ <FormattedMessage {...messages.ownerId} />: <span className={styles['highlight']}>{item.owner.id}</span></dd>

            <dd><FormattedMessage {...messages.repoID} />: <span className={styles['highlight']}>{item['id']}</span></dd>

            <dd><FormattedMessage {...messages.githubLink} />: <a href={item['html_url']} target='_blank' className={styles['highlight']}>{item['html_url']}</a></dd>

            <dd><FormattedMessage {...messages.description} />: <span className={styles['highlight']}>{item.description}</span></dd>

            <dd><FormattedMessage {...messages.stars} />: <span className={styles['highlight']}>{item['stargazers_count']}</span></dd>

            <dd><FormattedMessage {...messages.forks} />: <span className={styles['highlight']}>{item['forks_count']}</span></dd>

            <dd><FormattedMessage {...messages.language} />: <span className={styles['highlight']}>{item['language']}</span></dd>

            <dd><FormattedMessage {...messages.dateCreated} />: <span className={styles['highlight']}>{this.formatDate(item['created_at'])}</span></dd>

            <dd><FormattedMessage {...messages.dateUpdated} />: <span className={styles['highlight']}>{this.formatDate(item['updated_at'])}</span></dd>

            <dd>
              <input id={`${item.name}-${item.id}`} type='checkbox' value='ham' />
              <label htmlFor={`${item.name}-${item.id}`}>{item.name}</label>
            </dd>

          </dl>

        );

      });

    }

    return <H3 className={styles['loading']}><FormattedMessage {...messages.loading} /></H3>;

  }

  render() {

    return (
      <div className={adminExclPop}>
        <H2 className={styles['exclude-popular-header']}>
          <FormattedMessage {...messages.title} />
        </H2>
        <p>Click on the checkbox to exclude a repository from being indexed</p>
        <form className={styles['list-item']}>
          {this.displayPopularGithubList()}
        </form>
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

export default reduxForm({
  form: 'managePopular',
  fields: ['removeItem']
}, mapStateToProps, mapDispatchToProps)(ExcludePopular);
