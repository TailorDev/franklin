import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';

// see: https://github.com/mochajs/mocha/issues/1847
const { describe, it } = global;

import ExonRemove from '../ExonRemove';


describe('<ExonRemove />', () => {

  it('renders a remove dialog box', () => {
    const wrapper = shallow(
      <ExonRemove
        onActionRemoveCancelClick={() => {}}
        onRemoveExon={() => {}}
      />
    );

    expect(wrapper.find('.action-remove')).to.have.length(1);
    expect(wrapper.find('button.remove')).to.have.length(1);
    expect(wrapper.find('button.cancel')).to.have.length(1);
  });

  it('fires exon deletion canceling', () => {
    const spy = sinon.spy();
    const wrapper = shallow(
      <ExonRemove
        onActionRemoveCancelClick={spy}
        onRemoveExon={() => {}}
      />
    );

    wrapper.find('button.cancel').simulate('click');
    expect(spy.calledOnce).to.be.true;
  });

  it('fires exon deletion', () => {
    const spy = sinon.spy();
    const wrapper = shallow(
      <ExonRemove
        onActionRemoveCancelClick={() => {}}
        onRemoveExon={spy}
      />
    );

    wrapper.find('button.remove').simulate('click');
    expect(spy.calledOnce).to.be.true;
  });
});
