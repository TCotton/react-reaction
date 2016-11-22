import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { bindActionCreators } from 'redux';
import ACTIONS from '../../actions/actions';

const formFields = ['email', 'password', 'passwordConfirm'];

class Signup extends Component {

  static propTypes = {
    signupUser: PropTypes.func,
    fields: PropTypes.object,
    errorMessage: PropTypes.string,
    handleSubmit: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onFormSubmit(formProps) {

    // call action creator to sign up the user
    this.props.signupUser(formProps);

  }

  emailErrorDisplay() {

    if (this.props.fields.email.touched) {
      return this.props.fields.email.error;
    }

    return null;

  }

  passwordErrorDisplay() {

    if (this.props.fields.password.touched && this.props.fields.passwordConfirm.touched) {
      return this.props.fields.password.error;
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

    const { handleSubmit, fields: { email, password, passwordConfirm } } = this.props;

    return (
      <div className='form'>
        <form onSubmit={handleSubmit(this.onFormSubmit)}>

          <span className='error'>{this.props.errorMessage}</span>

          <fieldset>
            <label htmlFor='emailSignup'>Email:</label>
            <input type='text' id='emailSignup' {...domOnlyProps(email)} />

            <span className='error'>{this.emailErrorDisplay()}</span>

          </fieldset>

          <fieldset>
            <label htmlFor='passwordSignup'>Password:</label>
            <input type='text' id='passwordSignup' {...domOnlyProps(password)} />

            <span className='error'>{this.passwordErrorDisplay()}</span>

          </fieldset>

          <fieldset>
            <label htmlFor='passwordSignupConfirm'>Confirm password:</label>
            <input type='text' id='passwordSignupConfirm' {...domOnlyProps(passwordConfirm)} />
          </fieldset>

          <input type='submit' className='btn' value='Submit' />

        </form>
      </div>
    );
  }

}

function validate(formProps) {

  const errors = {};
  // eslint-disable-next-line max-len, no-useless-escape
  const re = /^(([^<>()\[\]\\.,;:\s@']+(\.[^<>()\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (typeof formProps.email !== 'undefined' && !re.test(formProps.email)) {
    errors.email = 'Please include a valid email address';
  }

  if (!Object.is(formProps.password, formProps.passwordConfirm)) {
    errors.password = 'Passwords must match';
  }

  if (typeof formProps.password !== 'undefined' && formProps.password.length < 9) {
    errors.password = 'The password must be more than 8 characters';
  }

  formFields.map((value) => { // eslint-disable-line array-callback-return

    if (!formProps[value]) {
      errors[value] = `Please do not leave the ${value} blank`;
    }

  });

  return errors;
}

function mapStateToProps(state) {
  return {
    errorMessage: state.auth.error
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    signupUser: ACTIONS.signupUser
  }, dispatch);
}

export default reduxForm({
  form: 'signup',
  fields: formFields,
  validate
}, mapStateToProps, mapDispatchToProps)(Signup);
