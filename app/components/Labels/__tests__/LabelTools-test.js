import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';

// see: https://github.com/mochajs/mocha/issues/1847
const { describe, it } = global;

import LabelTools from '../LabelTools';

describe('<LabelTools />', () => {
  it('renders a toolbar', () => {
    const wrapper = shallow(
      <LabelTools
        onActionToggleClick={() => {}}
        onActionEditClick={() => {}}
        onActionRemoveClick={() => {}}
      />
    );

    expect(wrapper.find('i.fa.toggle')).to.have.length(1);
    expect(wrapper.find('i.fa.edit')).to.have.length(1);
    expect(wrapper.find('i.fa.remove')).to.have.length(1);
  });

  it('fires label toggle', () => {
    const spy = sinon.spy();
    const wrapper = shallow(
      <LabelTools
        onActionToggleClick={spy}
        onActionEditClick={() => {}}
        onActionRemoveClick={() => {}}
      />
    );

    wrapper.find('i.toggle').simulate('click');
    expect(spy.calledOnce).to.be.true;
  });

  it('fires label edition', () => {
    const spy = sinon.spy();
    const wrapper = shallow(
      <LabelTools
        onActionToggleClick={() => {}}
        onActionEditClick={spy}
        onActionRemoveClick={() => {}}
      />
    );

    wrapper.find('i.edit').simulate('click');
    expect(spy.calledOnce).to.be.true;
  });

  it('fires label remove', () => {
    const spy = sinon.spy();
    const wrapper = shallow(
      <LabelTools
        onActionToggleClick={() => {}}
        onActionEditClick={() => {}}
        onActionRemoveClick={spy}
      />
    );

    wrapper.find('i.remove').simulate('click');
    expect(spy.calledOnce).to.be.true;
  });
});
