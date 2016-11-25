import { renderComponent, expect } from '../test/test_helper';
import App from './app';

// Use describe to group together similar tests
describe('App component', () => {

  let component;

  beforeEach(() => {

    // create an instance of App
    component = renderComponent(App);

  });

  // Use 'it' to test a single attribute of a target
  it(' shows a comment box', () => {

    // Use expect to make an assertion about a target
    console.dir(component);

  });

});