/* eslint-disable react/prefer-stateless-function, react/prop-types */
import React, { Component } from 'react';
import Frontpage from './frontpage';

export default class App extends Component {

  render() {

    return (
      <div>
        <Frontpage />
        { this.props.children }
      </div>
    );
  }

}
