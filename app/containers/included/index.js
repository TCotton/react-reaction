import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import momentJS from 'moment';
import classnames from 'classnames';
import { FormattedMessage } from 'react-intl';
import { bindActionCreators } from 'redux';
import messages from './messages';
import H2 from '../../components/h2';
import H3 from '../../components/h3';
import ACTIONS from '../../actions/actions';
import styles from './_excludePopular.scss';

const adminExclPop = classnames('admin', styles.list);

class ExcludePopularTwo extends Component {

  static propTypes = {
    formUpdate: PropTypes.func,
    items: PropTypes.shape({
      results: PropTypes.array
    })
  };

  constructor(props) {
    super(props);
    this.displayPopularGithubList = this.displayPopularGithubList.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentWillMount() {
    console.log('componentWillMount');
  }

  /**
   * @description add the repository id to the DB. This is then used to exclude from future GITHUB get requests
   * @param event {object}
   */

  onChange(event) {

    if (event.target.checked) {
      this.props.formUpdate(event.target.value, true);
    }

  }

  formatDate(dateString) {
    return momentJS(dateString).format('MMM Do YYYY');
  }

  displayPopularGithubList() {

    if (this.props.items.results) {

      /* eslint-disable max-len, arrow-body-style */
      return this.props.items.results.map((item) => {

        const checkboxItem = `${item.name.toLowerCase()}-${item.id}`;

        return (
          <dl key={item.id}>

            <dt><FormattedMessage {...messages.fullName} />: <span className={styles['highlight']}>{item['full_name']}</span>&nbsp;
              /&nbsp;<FormattedMessage {...messages.shortName} />: <span className={styles['highlight']}>{item['name']}</span></dt>

            <dd><FormattedMessage {...messages.owner} />: <a href={item.owner['html_url']} target='_blank' className={styles['highlight']}>{item.owner.login}</a>
              &nbsp;/&nbsp;<FormattedMessage {...messages.ownerType} />: <span className={styles['highlight']}>{item.owner.type}</span>
              &nbsp;/&nbsp;<FormattedMessage {...messages.ownerId} />: <span className={styles['highlight']}>{item.owner.id}</span></dd>

            <dd><FormattedMessage {...messages.repoID} />: <span className={styles['highlight']}>{item['id']}</span></dd>

            <dd><FormattedMessage {...messages.githubLink} />: <a href={item['html_url']} target='_blank' className={styles['highlight']}>{item['html_url']}</a></dd>

            <dd><FormattedMessage {...messages.description} />: <span className={styles['highlight']}>{item.description}</span></dd>

            <dd><FormattedMessage {...messages.stars} />: <span className={styles['highlight']}>{item['stargazers_count']}</span></dd>

            <dd><FormattedMessage {...messages.forks} />: <span className={styles['highlight']}>{item['forks_count']}</span></dd>

            <dd><FormattedMessage {...messages.language} />: <span className={styles['highlight']}>{item['language']}</span></dd>

            <dd><FormattedMessage {...messages.dateCreated} />: <span className={styles['highlight']}>{this.formatDate(item['created_at'])}</span></dd>

            <dd><FormattedMessage {...messages.dateUpdated} />: <span className={styles['highlight']}>{this.formatDate(item['updated_at'])}</span></dd>

            <dd className='checkbox'>

              <input id={checkboxItem} type='checkbox' name={checkboxItem} value={item.id} defaultChecked={false} onChange={this.onChange} />
              <label htmlFor={checkboxItem}>{item.name}</label>

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
        <p>Click on the checkbox to include a repository from being indexed</p>
        <form className={styles['list-item']} noValidate>
          {this.displayPopularGithubList()}
        </form>
      </div>
    );

  }

}

function mapStateToProps(state) {

  return {
    items: state.popular
  };

}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ formUpdate: ACTIONS.formUpdate }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ExcludePopularTwo);
