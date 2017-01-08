import React, { Component } from 'react';
import { reduxForm, propTypes } from 'redux-form';
import momentJS from 'moment';
import classnames from 'classnames';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import H2 from '../../components/h2';
import H3 from '../../components/h3';
import styles from './_excludePopular.scss';

let domOnlyProps; // eslint-disable-line no-unused-vars

const adminExclPop = classnames('admin', styles.list);

const fields = [
  'checkboxes[]',
  'aCheckbox'
];

class ExcludePopularTwo extends Component {

  static propTypes = {
    ...propTypes
  };

  constructor(props) {
    super(props);
    this.displayPopularGithubList = this.displayPopularGithubList.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  componentWillMount() {
    console.log('componentWillMount');

    this.props.items.checkboxes.map((item) => { // eslint-disable-line array-callback-return
      this.props.fields.checkboxes.addField(item);
    });

  }

  componentWillReceiveProps(nextProps) {
    console.log('componentWillReceiveProps');
    console.dir(nextProps);
  }

  componentWillUpdate(nextProps, nextState) {
    console.log('componentWillUpdate');
    // perform any preparations for an upcoming update
    console.dir(nextProps);
    console.dir(nextState);
  }

  /**
   *
   * @param dateString {string}
   * @returns {string}
   */

  formatDate(dateString) {
    return momentJS(dateString).format('MMM Do YYYY');
  }

  handleFormSubmit(...args) {
    console.dir(...args);
  }

  /**
   *
   * @param paramArray {array}
   * @param paramString {string}
   * @return array
   */

  filterCheckboxes(paramArray, paramString) {

    return paramArray.filter((item) => { // eslint-disable-line arrow-body-style
      return (typeof item.value === 'string') && (item.value.indexOf(paramString) !== -1);
    });

  }

  createMarkupSpace() {
    return {
      __html: '&nbsp'
    };
  }

  createMarkupForwardSlash() {
    return {
      __html: '&nbsp;/&nbsp;'
    };
  }

  displayPopularGithubList(checkboxes) {

    if (Array.isArray(checkboxes) && checkboxes.length > 0) {

      /* eslint-disable max-len, arrow-body-style */
      return this.props.items.results.map((item) => {

        const checkboxItem = `${item.name.toLowerCase()}-${item.id}`;
        const checkedBox = this.filterCheckboxes(checkboxes, checkboxItem);

        console.dir(checkedBox);

        return (
          <dl key={item.id}>

            <dt>
              <FormattedMessage {...messages.fullName} />:<span dangerouslySetInnerHTML={this.createMarkupSpace()} />
              <span className={styles['highlight']}>{item['full_name']}</span>

              <span dangerouslySetInnerHTML={this.createMarkupForwardSlash()} />

              <FormattedMessage {...messages.shortName} />:<span dangerouslySetInnerHTML={this.createMarkupSpace()} />
              <span className={styles['highlight']}>{item['name']}</span>
            </dt>

            <dd>
              <FormattedMessage {...messages.owner} />:<span dangerouslySetInnerHTML={this.createMarkupSpace()} />
              <a href={item.owner['html_url']} target='_blank' className={styles['highlight']}>{item.owner.login}</a>

              <span dangerouslySetInnerHTML={this.createMarkupForwardSlash()} />

              <FormattedMessage {...messages.ownerType} />:<span dangerouslySetInnerHTML={this.createMarkupSpace()} />
              <span className={styles['highlight']}>{item.owner.type}</span>

              <span dangerouslySetInnerHTML={this.createMarkupForwardSlash()} />

              <FormattedMessage {...messages.ownerId} />:<span dangerouslySetInnerHTML={this.createMarkupSpace()} />
              <span className={styles['highlight']}>{item.owner.id}</span>
            </dd>

            <dd>
              <FormattedMessage {...messages.repoID} />:<span dangerouslySetInnerHTML={this.createMarkupSpace()} />
              <span className={styles['highlight']}>{item['id']}</span>
            </dd>

            <dd>
              <FormattedMessage {...messages.githubLink} />:<span dangerouslySetInnerHTML={this.createMarkupSpace()} />
              <a href={item['html_url']} target='_blank' className={styles['highlight']}>{item['html_url']}</a>
            </dd>

            <dd>
              <FormattedMessage {...messages.description} />:<span dangerouslySetInnerHTML={this.createMarkupSpace()} />
              <span className={styles['highlight']}>{item.description}</span>
            </dd>

            <dd>
              <FormattedMessage {...messages.stars} />:<span dangerouslySetInnerHTML={this.createMarkupSpace()} />
              <span className={styles['highlight']}>{item['stargazers_count']}</span>
            </dd>

            <dd>
              <FormattedMessage {...messages.forks} />:<span dangerouslySetInnerHTML={this.createMarkupSpace()} />
              <span className={styles['highlight']}>{item['forks_count']}</span>
            </dd>

            <dd>
              <FormattedMessage {...messages.language} />:<span dangerouslySetInnerHTML={this.createMarkupSpace()} />
              <span className={styles['highlight']}>{item['language']}</span>
            </dd>

            <dd>
              <FormattedMessage {...messages.dateCreated} />:<span dangerouslySetInnerHTML={this.createMarkupSpace()} />
              <span className={styles['highlight']}>{this.formatDate(item['created_at'])}</span>
            </dd>

            <dd>
              <FormattedMessage {...messages.dateUpdated} />:<span dangerouslySetInnerHTML={this.createMarkupSpace()} />
              <span className={styles['highlight']}>{this.formatDate(item['updated_at'])}</span>
            </dd>

            <dd className='checkbox'>

              <input id={checkboxItem} type='checkbox' {...domOnlyProps(checkedBox['0'])} />
              <label htmlFor={checkboxItem}>{item.name}</label>

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

    const { handleSubmit, fields: { checkboxes, aCheckbox } } = this.props;

    return (
      <div className={adminExclPop}>
        <H2 className={styles['exclude-popular-header']}>
          <FormattedMessage {...messages.title} />
        </H2>
        <p>Click on the checkbox to exclude a repository from being indexed</p>
        <form className={styles['list-item']} onChange={handleSubmit(this.handleFormSubmit)}>

          <dd className='checkbox'>

            <input id='whatever' type='checkbox' {...domOnlyProps(aCheckbox)} />
            <label htmlFor='whatever'>Here</label>

          </dd>

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
  initialValues: {
    aCheckbox: null
  },
  fields
}, mapStateToProps)(ExcludePopularTwo);
