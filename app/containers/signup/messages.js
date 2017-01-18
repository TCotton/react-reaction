import { defineMessages } from 'react-intl';

export default defineMessages({

  title: {
    id: 'app.containers.Signup.title',
    defaultMessage: 'New user'
  },

  subTitle: {
    id: 'app.containers.Signup.subTitle',
    defaultMessage: 'Current users'
  },

  email: {
    id: 'app.containers.Signup.email',
    defaultMessage: 'Email'
  },

  password: {
    id: 'app.containers.Signup.password',
    defaultMessage: 'Password'
  },

  passwordConfirm: {
    id: 'app.containers.Signup.passwordConfirm',
    defaultMessage: 'Confirm password'
  },

  errorEmail: {
    id: 'app.containers.Signup.errorEmail',
    defaultMessage: 'Please include a valid email address'
  },

  errorPasswordMatch: {
    id: 'app.containers.Signup.errorPasswordMatch',
    defaultMessage: 'Passwords must match'
  },

  errorPasswordLength: {
    id: 'app.containers.Signup.errorPasswordLength',
    defaultMessage: 'The password must be more than 8 characters'
  }

});
