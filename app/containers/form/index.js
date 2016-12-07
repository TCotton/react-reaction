import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ACTIONS from '../../actions/actions';

export default function (ComposedComponent) {

  class Authentication extends Component {

    componentWillMount() {
      this.props.fetchGitHubData();
    }

    componentWillUpdate(nextProps) {

      if (nextProps.popular) {
        const fields = nextProps.popular.map((item) => {
          return `name-${item.id}`;
        });
        return false;
      }

    }

    render() {
      return <ComposedComponent {...this.props} />;
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

  return connect(mapStateToProps, mapDispatchToProps)(Authentication);

}
