import React, { Component } from 'react';
import { reduxForm } from 'redux-form';

let fields = [];

class ExcludePopularTwo extends Component {

  componentWillMount() {
   /* let fields = this.props.popular.map((items) => {
      return
    });*/
  }

/*
  componentWillUpdate(nextProps) {

    if (nextProps.popular) {


      console.dir(this.props);
    }

  }
*/

  render() {
    console.dir(this.props);
    return (
      <div>Rendered</div>
    );
  }

}

function mapStateToProps(state) {

  return {
    items: state.popular
  };

}

export default reduxForm({
  form: 'managePopular',
  fields
}, mapStateToProps)(ExcludePopularTwo);
