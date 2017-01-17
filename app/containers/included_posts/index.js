import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ACTIONS from '../../actions/actions';

export default function (ComposedComponent) {

  class Authentication extends Component {

    static propTypes = {
      fetchGitHubData: PropTypes.func.isRequired
    };

    componentWillMount() {
      this.props.fetchGitHubData();
    }

    // err, what?
 /*   componentWillUpdate(nextProps) {

      if (nextProps.popular) {
        return false;
      }

      return true;

    }*/

    render() {
      return <ComposedComponent {...this.props} />;
    }

  }

  function mapStateToProps(state) {

    console.dir(state);

    return {
      popular: state.popular.results,
      id: state.forms.id
    };
  }

  function mapDispatchToProps(dispatch) {
    return bindActionCreators({
      fetchGitHubData: ACTIONS.fetchGitHubData
    }, dispatch);
  }

  return connect(mapStateToProps, mapDispatchToProps)(Authentication);
}
