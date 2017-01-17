import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ACTIONS from '../../actions/actions';

export default function (ComposedComponent) {

  class Authentication extends Component {

    static propTypes = {
      fetchGitHubDataRemovedItems: PropTypes.func.isRequired
    };

    componentWillMount() {
      this.props.fetchGitHubDataRemovedItems();
    }

    render() {
      return <ComposedComponent {...this.props} />;
    }

  }

  function mapStateToProps(state) {

    return {
      popular: state.popular.results,
      id: state.forms.id
    };

  }

  function mapDispatchToProps(dispatch) {
    return bindActionCreators({
      fetchGitHubDataRemovedItems: ACTIONS.fetchGitHubDataRemovedItems
    }, dispatch);
  }

  return connect(mapStateToProps, mapDispatchToProps)(Authentication);
}
