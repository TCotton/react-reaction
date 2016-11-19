/* eslint-disable react/prefer-stateless-function, react/prop-types */
import React, { Component } from 'react';
import HomePage from './homepage/homepage';

export default class App extends Component {

  render() {

    return (
      <div>
        <HomePage />
        { this.props.children }
      </div>
    );
  }

}
