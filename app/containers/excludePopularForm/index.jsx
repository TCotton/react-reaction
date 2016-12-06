import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import momentJS from 'moment';
import classnames from 'classnames';
import { FormattedMessage } from 'react-intl';
import ACTIONS from '../../actions/actions';
import messages from './messages';
import H2 from '../../components/h2';
import H3 from '../../components/h3';
import styles from './_excludePopular.scss';
import InputCheckbox from '../../components/InputCheckbox';

console.log('here');

class ExcludePopularForm extends Component {

  constructor(props) {
    super(props);
  }

  render() {

    console.dir(this.props);

    return (
      <div>Form here</div>
    )

  }

}

export default reduxForm({
  form: 'managePopular',
  fields: []
})(ExcludePopularForm);
