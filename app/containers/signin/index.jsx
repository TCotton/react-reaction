import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { bindActionCreators } from 'redux';
import ACTIONS from '../../actions/actions';

class Signin extends Component {

  static propTypes = {
    signinUser: PropTypes.func,
    errorMessage: PropTypes.string,
    handleSubmit: PropTypes.func,
    fields: PropTypes.shape({
      email: PropTypes.object,
      password: PropTypes.object
    })
  };

  constructor(props) {
    super(props);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.renderAlert = this.renderAlert.bind(this);
  }

  handleFormSubmit({ email, password }) {
    console.dir(...arguments);
    this.props.signinUser({ email, password });
  }

  renderAlert() {

    if (this.props.errorMessage) {
      return (
        <div className='error'>
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
      <div className='form'>
        <form onSubmit={handleSubmit(this.handleFormSubmit)}>

          <fieldset>

            <label htmlFor='emailSignin'>Email:</label>
            <input {...domOnlyProps(email)} type='email' id='emailSignin' />

          </fieldset>

          <fieldset>

            <label htmlFor='passwordSignin'>Password:</label>
            <input {...domOnlyProps(password)} type='password' id='passwordSignin' />

          </fieldset>

          <fieldset>

            {this.renderAlert()}

            <input type='submit' className='btn button-primary' value='Submit' />

          </fieldset>

        </form>
      </div>
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
