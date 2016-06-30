import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';

// see: https://github.com/mochajs/mocha/issues/1847
const { describe, it } = global;

import Remove from '../';


describe('<Remove />', () => {

  it('should render a remove dialog box', () => {
    const wrapper = shallow(
      <Remove
        onCancel={() => {}}
        onRemove={() => {}}
      >
        Foo
      </Remove>
    );

    expect(wrapper.find('.action-remove')).to.have.length(1);
    expect(wrapper.find('button.remove')).to.have.length(1);
    expect(wrapper.find('button.cancel')).to.have.length(1);
  });

  it('should fire cancel handler', () => {
    const spy = sinon.spy();
    const wrapper = shallow(
      <Remove
        onCancel={spy}
        onRemove={() => {}}
      >
        Foo
      </Remove>
    );

    wrapper.find('button.cancel').simulate('click');
    expect(spy.calledOnce).to.be.true;
  });

  it('should fire deletion handler', () => {
    const spy = sinon.spy();
    const wrapper = shallow(
      <Remove
        onCancel={() => {}}
        onRemove={spy}
      >
        Foo
      </Remove>
    );

    wrapper.find('button.remove').simulate('click');
    expect(spy.calledOnce).to.be.true;
  });
});
