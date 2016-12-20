import React, { Component, PropTypes } from 'react';
import { reset } from 'redux-form';     // reset action creator exported by redux-form
import { connect } from 'react-redux';  // needed to bind reset action creator to dispatch
import SubmitFromParentForm from './SubmitFromParentForm';

class SubmitFromParentContainer extends Component {

  static propTypes = {
    onSubmit: PropTypes.func,  // shows a dialog box
    reset: PropTypes.func      // reset action bound to dispatch
  };

  constructor(props) {
    super(props);
    // Pro tip: The best place to bind your member functions is in the component constructor
    this.handleSubmit = this.handleSubmit.bind(this);
    this.resetForm = this.resetForm.bind(this);
  }

  componentDidMount() {
    const component = this.myForm;
    // ...do something with component
  }

  handleSubmit() {
    console.dir(this.myForm);
    this.myForm.submit(); // will return a promise
  }

  resetForm() {
    this.props.reset('submitFromParent'); // pass form name to bound action creator
  }

  render() {

    const { onSubmit } = this.props;

    return (
      <div>

        <div>
          <button type='button' onClick={this.handleSubmit}>
            <i/> Submit
          </button>
          <button type='button' onClick={this.resetForm}>
            Clear Values
          </button>
        </div>

        <SubmitFromParentForm ref={(c) => { this.myForm = c; }} onSubmit={onSubmit} />

      </div>
    );

  }
}

export default connect(undefined, { reset })(SubmitFromParentContainer);
