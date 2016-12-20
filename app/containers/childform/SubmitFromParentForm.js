import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';

export const fields = ['username', 'password'];

const validate = (values) => {
  const errors = {};

  if (!values.username) {
    errors.username = 'Required';
  } else if (values.username.length > 15) {
    errors.username = 'Must be 15 characters or less';
  }

  if (!values.password) {
    errors.password = 'Required';
  }

  return errors;
};

class SubmitFromParentForm extends Component {

  static propTypes = {
    fields: PropTypes.object.isRequired
  };

  render() {

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
      ...domProps
    }) => domProps;

    const { fields: { username, password } } = this.props;

    return (
      <div>
        <div>
          <label>Username</label>
          <div>
            <input type='text' placeholder='Username' {...domOnlyProps(username)} />
          </div>
          {username.touched && username.error && <div>{username.error}</div>}
        </div>
        <div>
          <label>Password</label>
          <div>
            <input type='password' placeholder='Password' {...domOnlyProps(password)} />
          </div>
          {password.touched && password.error && <div>{password.error}</div>}
        </div>
      </div>
    );
  }
}

export default reduxForm({
  form: 'submitFromParent',
  fields,
  validate
})(SubmitFromParentForm);
