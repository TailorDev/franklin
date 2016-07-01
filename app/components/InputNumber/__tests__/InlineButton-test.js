import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

// see: https://github.com/mochajs/mocha/issues/1847
const { describe, it } = global;

import InlineButton from '../InlineButton';


describe('<InlineButton />', () => {

  it('renders itself', () => {
    const wrapper = shallow(
      <InlineButton
        onChange={() => {}}
        onClick={() => {}}
      >
        Button text
      </InlineButton>
    );

    expect(wrapper.find('button')).to.have.length(1);
    expect(wrapper.find('button').text()).to.equal('Button text');
  });

  it('has a button that can be disabled', () => {
    const wrapper = shallow(
      <InlineButton
        onChange={() => {}}
        onClick={() => {}}
        hasButtonDisabled
      >
        Button text
      </InlineButton>
    );

    expect(wrapper.find('button')).to.have.length(1);
    expect(wrapper.find('button').props().disabled).to.be.true;
  });
});
