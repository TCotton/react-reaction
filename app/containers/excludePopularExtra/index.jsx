import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import classnames from 'classnames';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import ACTIONS from '../../actions/actions';
import messages from './messages';
import H2 from '../../components/h2';
import styles from './_excludePopular.scss';
import ExcludePopularForm from '../excludePopularExtra';

const adminExclPop = classnames('admin', styles.list);

class ExcludePopularExtra extends Component {

  static propTypes = {
    fetchGitHubData: PropTypes.func,
    popular: PropTypes.array
  };

  constructor(props) {
    super(props);
    this.displayPopularGithubList = this.displayPopularGithubList.bind(this);
    this.findCheckBoxes = this.findCheckBoxes.bind(this);

    this.state = {
      fetching: true
    };

  }

  componentWillMount() {
    this.props.fetchGitHubData();
  }

  componentWillReceiveProps(nextProps) {

    if (Array.isArray(nextProps.popular)) {
      console.dir(nextProps);
      this.setState({ fetching: false });
    }

  }

  shouldComponentUpdate() {
    // return a boolean value
    console.log(this.state);
    return this.state.fetching;
  }

  findCheckBoxes(items) {

    return items.map((item) => {
      return `name-${item.id}`;
    });

  }

  displayPopularGithubList() {

    if (this.props.popular) {
      const checkBoxes = this.findCheckBoxes(this.props.popular);

     /* return (
        <ExcludePopularForm items={this.props.popular} checkBoxes={checkBoxes} />
      );*/

    }

    return <div></div>;

  }

  render() {

    return (
      <div className={adminExclPop}>
        <H2 className={styles['exclude-popular-header']}>
          <FormattedMessage {...messages.title} />
        </H2>
        <p>Click on the checkbox to exclude a repository from being indexed</p>
        {this.displayPopularGithubList()}
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

export default connect(mapStateToProps, mapDispatchToProps)(ExcludePopularExtra);

