import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { bindActionCreators } from 'redux';
import ACTIONS from '../../actions/actions';

class Signin extends Component {

  static propTypes = {
    signinUser: PropTypes.func,
    errorMessage: PropTypes.string,
    handleSubmit: PropTypes.func,
    fields: PropTypes.object
  };

  constructor(props) {
    super(props);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.renderAlert = this.renderAlert.bind(this);
  }

  handleFormSubmit({ email, password }) {
    this.props.signinUser({ email, password });
  }

  renderAlert() {

    if (this.props.errorMessage) {
      return (
        <div className='alert alert-danger'>
          <strong>Opps!</strong> {this.props.errorMessage} <br />
        </div>
      );
    }

    return null;

  }

  render() {

    // crazy workaround to remove browser error noise in react from > 15.2.0 and redux-form < 6
    // https://github.com/erikras/redux-form/issues/1249#issuecomment-238791983

    const domOnlyProps = ({
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
      ...domProps }) => domProps;

    const { handleSubmit, fields: { email, password } } = this.props;

    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit)}>

        <fieldset className='form-group'>

          <label htmlFor='emailSignin'>Email:</label><br />
          <input {...domOnlyProps(email)} type='email' id='emailSignin' className='form-control' />

        </fieldset>

        <fieldset className='form-group'>

          <label htmlFor='passwordSignin'>Password:</label><br />
          <input {...domOnlyProps(password)} type='password' id='passwordSignin' className='form-control' />

        </fieldset>

        <fieldset className='form-group'>

          {this.renderAlert()}

          <input type='submit' className='btn button-primary' value='Submit' />

        </fieldset>

      </form>
    );

  }

}

function mapStateToProps(state) {
  return {
    errorMessage: state.auth.error
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    signinUser: ACTIONS.signinUser
  }, dispatch);
}

export default reduxForm({
  form: 'signin',
  fields: ['email', 'password']
}, mapStateToProps, mapDispatchToProps)(Signin);
