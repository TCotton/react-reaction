/* eslint-disable arrow-body-style */
import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import ACTIONS from '../../actions/actions';

import ListItem from '../../components/Listitem';

import styles from './_ListItem.scss';

class Frontpage extends Component {

  static propTypes = {
    fetchGitHubData: PropTypes.func,
    popular: PropTypes.array
  };

  componentWillMount() {
    this.props.fetchGitHubData();
  }

  render() {

    return (
      <div className={styles.list}>
        <ListItem items={this.props.popular} />
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
