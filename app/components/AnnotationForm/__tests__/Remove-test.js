import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';

// see: https://github.com/mochajs/mocha/issues/1847
const { describe, it } = global;

import Remove from '../Remove';


describe('<Remove />', () => {

  it('renders a remove dialog box', () => {
    const wrapper = shallow(
      <Remove
        onActionRemoveCancelClick={() => {}}
        onRemove={() => {}}
      />
    );

    expect(wrapper.find('.action-remove')).to.have.length(1);
    expect(wrapper.find('button.remove')).to.have.length(1);
    expect(wrapper.find('button.cancel')).to.have.length(1);
  });

  it('fires label deletion canceling', () => {
    const spy = sinon.spy();
    const wrapper = shallow(
      <Remove
        onActionRemoveCancelClick={spy}
        onRemove={() => {}}
      />
    );

    wrapper.find('button.cancel').simulate('click');
    expect(spy.calledOnce).to.be.true;
  });

  it('fires label deletion', () => {
    const spy = sinon.spy();
    const wrapper = shallow(
      <Remove
        onActionRemoveCancelClick={() => {}}
        onRemove={spy}
      />
    );

    wrapper.find('button.remove').simulate('click');
    expect(spy.calledOnce).to.be.true;
  });
});
