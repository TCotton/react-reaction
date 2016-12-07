import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { reduxForm } from 'redux-form';
import momentJS from 'moment';
import classnames from 'classnames';
import { FormattedMessage } from 'react-intl';
import ACTIONS from '../../actions/actions';
import messages from './messages';
import H2 from '../../components/h2';
import H3 from '../../components/h3';
import styles from './_excludePopular.scss';
import InputCheckbox from '../../components/InputCheckbox';
let domOnlyProps;

const adminExclPop = classnames('admin', styles.list);

const fields = ['checkRemove'];
let removeItem = [];

class ExcludePopularTwo extends Component {

  constructor(props) {
    super(props);
    this.displayPopularGithubList = this.displayPopularGithubList.bind(this);
    this.displayFields = this.displayFields.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentWillMount() {
    this.props.fetchGitHubData();
  }

  formatDate(dateString) {
    return momentJS(dateString).format('MMM Do YYYY');
  }

  displayFields(id) {
    removeItem.push(id.toString());
  }

  onChange(event) {
    console.dir(event);
  }

  displayPopularGithubList(removeItem) {

    if (this.props.popular) {

      console.dir(removeItem);

      /* eslint-disable max-len, arrow-body-style */
      return this.props.popular.map((item, index) => {

        this.displayFields(item.id);

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

              <input
                id={`${item.name}-${item.id}`}
                type='checkbox'
                value={`${item.name}-${item.id}`}
                onChange={this.onChange} />

              <label htmlFor={`${item.name}-${item.id}`}>{item.name}</label>

            </dd>

          </dl>

        );

      });

    }

    return <H3 className={styles['loading']}><FormattedMessage {...messages.loading} /></H3>;

  }

  render() {

    // crazy workaround to remove browser error noise in react from > 15.2.0 and redux-form < 6
    // https://github.com/erikras/redux-form/issues/1249#issuecomment-238791983

    domOnlyProps = ({
      initialValue,
      autofill,
      onUpdate,
      valid,
      invalid,
      dirty,
      pristine,
      active,
      touched,
      visited,
      autofilled,
      error,
      ...domProps
    }) => domProps;

    const { handleSubmit, fields: { removeItem } } = this.props;

    return (
      <div className={adminExclPop}>
        <H2 className={styles['exclude-popular-header']}>
          <FormattedMessage {...messages.title} />
        </H2>
        <p>Click on the checkbox to exclude a repository from being indexed</p>
        <form className={styles['list-item']} onSubmit={handleSubmit}>
          {this.displayPopularGithubList(removeItem)}
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

export default reduxForm({
  form: 'managePopular',
  fields: ['removeItem']
}, mapStateToProps)(ExcludePopularTwo);
