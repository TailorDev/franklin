import React from 'react';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';

// see: https://github.com/mochajs/mocha/issues/1847
const { describe, it } = global;

import Notifications from '../presenter';
import MessageBox from '../MessageBox';


describe('<Notifications />', () => {

  it('renders nothing if no messages', () => {
    const wrapper = shallow(<Notifications messages={[]} onMessageBoxClose={() => {}} />);

    expect(wrapper.find('.message-boxes')).to.have.length(1);
    expect(wrapper.find('.message-box')).to.have.length(0);
  });

  it('wraps a leveld message box', () => {
    const messages = [
      {
        content: 'foo',
        level: 'error',
        count: 1,
      }
    ];
    const wrapper = mount(
      <Notifications
        messages={messages}
        onMessageBoxClose={() => {}}
      />
    );

    expect(wrapper.find('.message-boxes')).to.have.length(1);
    expect(wrapper.find(MessageBox)).to.have.length(1);
    expect(wrapper.find('.message-box.error')).to.have.length(1);
    expect(wrapper.find('.message-box.error').html()).to.contain('<p>foo</p>');
  });

  it('wraps many leveld message boxes', () => {
    const messages = [
      {
        content: 'foo',
        level: 'warning',
        count: 1,
      },
      {
        content: 'bar',
        level: 'success',
        count: 1,
      },
      {
        content: 'lol',
        level: 'info',
        count: 1,
      }
    ];
    const wrapper = mount(
      <Notifications
        messages={messages}
        onMessageBoxClose={() => {}}
      />
    );

    expect(wrapper.find('.message-boxes')).to.have.length(1);
    expect(wrapper.find(MessageBox)).to.have.length(3);
    expect(wrapper.find('.message-box.warning')).to.have.length(1);
    expect(wrapper.find('.message-box.success')).to.have.length(1);
    expect(wrapper.find('.message-box.info')).to.have.length(1);
    expect(wrapper.find('.message-box.warning').html()).to.contain('<p>foo</p>');
    expect(wrapper.find('.message-box.success').html()).to.contain('<p>bar</p>');
    expect(wrapper.find('.message-box.info').html()).to.contain('<p>lol</p>');
  });

  it('calls close message box handler', () => {
    const spy = sinon.spy();

    const messages = [
      {
        content: 'foo',
        level: 'warning',
        count: 1,
      },
      {
        content: 'bar',
        level: 'success',
        count: 1,
      },
      {
        content: 'lol',
        level: 'info',
        count: 1,
      }
    ];
    const wrapper = mount(
      <Notifications
        messages={messages}
        onMessageBoxClose={spy}
      />
    );

    // Close the info message
    wrapper.find('.message-box.info').children('.close-button').simulate('click');
    expect(spy.calledOnce).to.be.true;

    // Close the warning message
    wrapper.find('.message-box.warning').children('.close-button').simulate('click');
    expect(spy.calledTwice).to.be.true;

    // Close the success message
    wrapper.find('.message-box.success').children('.close-button').simulate('click');
    expect(spy.calledThrice).to.be.true;

    // Check that the handler is called with proper arguments
    expect(spy.withArgs(0).calledOnce).to.be.true;
    expect(spy.withArgs(1).calledOnce).to.be.true;
    expect(spy.withArgs(2).calledOnce).to.be.true;
  });
});
