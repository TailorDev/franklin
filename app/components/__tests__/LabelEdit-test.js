import React from 'react';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';

// see: https://github.com/mochajs/mocha/issues/1847
const { describe, it } = global;

import LabelEdit from '../LabelEdit';
import LabelForm from '../LabelForm';


describe('<LabelEdit />', () => {

  const dummyLabel = {
    name: 'foo',
    color: '#000',
    isActive: true
  };

  it('renders a label form', () => {
    const wrapper = shallow(
      <LabelEdit
        onActionEditCancelClick={() => {}}
        onLabelEdit={() => {}}
        label={dummyLabel}
      />
    );

    expect(wrapper.find(LabelForm)).to.have.length(1);
  });

  it('fires label edition canceling', () => {
    const spy = sinon.spy();
    const wrapper = mount(
      <LabelEdit
        onActionEditCancelClick={spy}
        onLabelEdit={() => {}}
        label={dummyLabel}
      />
    );

    wrapper.find('input[type="reset"]').simulate('click');
    expect(spy.calledOnce).to.be.true;
  });

  it('submits edited label', () => {
    const spy = sinon.spy();
    const wrapper = mount(
      <LabelEdit
        onActionEditCancelClick={() => {}}
        onLabelEdit={spy}
        label={dummyLabel}
      />
    );

    wrapper.find('input[type="text"]').simulate('change', {
      persist: () => {},
      target: {
        value: 'bar'
      }
    });
    wrapper.find('.button.submit').simulate('click');

    expect(spy.calledOnce).to.be.true;
    expect(spy.calledWith({ name: 'bar', color: '#000', isActive: true })).to.be.true;
  });
});
