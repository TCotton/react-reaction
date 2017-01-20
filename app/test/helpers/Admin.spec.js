import React from 'react';
import { expect } from 'chai';
import _ from 'lodash';
import { mountWithIntl, shallowWithIntl } from './intl-test';

import Admin from '../../../app/components/Admin';
import stylesClass from '../../../app/components/Admin/_admin.scss';
import messages from '../../../app/components/Admin/messages';

// Step 1: this next line is important since the finders expect a '.' at the string start
const styles = _.mapValues(stylesClass, raw => '.' + raw);

describe('<Admin />', () => {

  let mountWrapper;
  let mountShallow;

  beforeEach(() => {

    // create an instance of CommentBox
    mountWrapper = mountWithIntl(
      <Admin />
    );

    mountShallow = shallowWithIntl(
      <Admin />
    );

  });

  it('should have a className of admin', () => {
    expect(mountWrapper.find('.admin').length).to.equal(1);
    expect(mountWrapper.find('.admin-index').length).to.not.equal(1);
  });

  it('should have an H1 element', () => {
    expect(mountWrapper.find('h1').length).to.equal(1);
    expect(mountWrapper.find('h2').length).to.not.equal(1);
  });

  it('should have an UL wrapper', () => {
    expect(mountWrapper.find('ul').length).to.equal(1);
    expect(mountWrapper.find('dl').length).to.not.equal(1);
  });

  it('should have four li element', () => {
    expect(mountWrapper.find('li').length).to.equal(4);
    expect(mountWrapper.find('dd').length).to.not.equal(4);
  });

  it('should have four a element', () => {
    expect(mountWrapper.find('a').length).to.equal(4);
    expect(mountWrapper.find('dd').length).to.not.equal(4);
  });

  it('should contain text ' + messages.title.defaultMessage, () => {
    expect(mountWrapper.text()).to.contain(messages.title.defaultMessage);
  });

  it('should contain text ' + messages.linkSignUp.defaultMessage, () => {
    expect(mountWrapper.text()).to.contain(messages.linkSignUp.defaultMessage);
  });

  it('should contain text ' + messages.linkSignOut.defaultMessage, () => {
    expect(mountWrapper.text()).to.contain(messages.linkSignOut.defaultMessage);
  });

  it('should contain text ' + messages.linkManagePopularList.defaultMessage, () => {
    expect(mountWrapper.text()).to.contain(messages.linkManagePopularList.defaultMessage);
  });

  it('should contain text ' + messages.addItemsBack.defaultMessage, () => {
    expect(mountWrapper.text()).to.contain(messages.addItemsBack.defaultMessage);
  });

});
