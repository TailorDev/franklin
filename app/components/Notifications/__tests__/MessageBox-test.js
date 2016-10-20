import React from 'react';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';

// see: https://github.com/mochajs/mocha/issues/1847
const { describe, it } = global;

import MessageBox from '../MessageBox';


describe('<MessageBox />', () => {

  it('renders a message', () => {
    const message = {
      content: 'hello.',
    };
    const wrapper = shallow(<MessageBox message={message} onClose={() => {}} index={0} />);

    expect(wrapper.find('.message-box')).to.have.length(1);
    expect(wrapper.text()).to.equal('hello.×');
  });

  it('renders a leveld message', () => {
    const message = {
      content: 'hello.',
      level: 'info',
    };
    const wrapper = shallow(<MessageBox message={message} onClose={() => {}} index={0} />);

    expect(wrapper.find('.message-box.info')).to.have.length(1);
    expect(wrapper.text()).to.equal('hello.×');
  });
});
