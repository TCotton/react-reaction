import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ACTIONS from '../../actions/actions';

export default function (ComposedComponent) {

  class Authentication extends Component {

    static propTypes = {
      fetchGitHubData: PropTypes.func.isRequired,
      checkboxes: PropTypes.array
    };

    componentWillMount() {
      this.props.fetchGitHubData();
    }

    // err, what?
    componentWillUpdate(nextProps) {

      if (nextProps.popular) {
        return false;
      }

      return true;

    }

    render() {

      if (Array.isArray(this.props.checkboxes)) {
        return <ComposedComponent {...this.props} />;
      }

      return null;

    }

  }

  function mapStateToProps(state) {

    return {
      popular: state.popular.results,
      checkboxes: state.popular.checkboxes
    };
  }

  function mapDispatchToProps(dispatch) {
    return bindActionCreators({
      fetchGitHubData: ACTIONS.fetchGitHubData
    }, dispatch);
  }

  return connect(mapStateToProps, mapDispatchToProps)(Authentication);

}
