import { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ACTIONS from '../../actions/actions';
import persistor from '../../persistor';

class Signout extends Component {

  static propTypes = {
    signoutUser: PropTypes.func
  };

  componentWillMount() {
    this.props.signoutUser();
    persistor.purge(); // doesn't look right -> refactor?
  }

  render() {
    return null;
  }

}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    signoutUser: ACTIONS.signoutUser
  }, dispatch);
}

export default connect(null, mapDispatchToProps)(Signout);
