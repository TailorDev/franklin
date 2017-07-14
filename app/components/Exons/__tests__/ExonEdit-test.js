import React from 'react';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';

// see: https://github.com/mochajs/mocha/issues/1847
const { describe, it } = global;

import ExonEdit from '../ExonEdit';
import ExonForm from '../ExonForm';

describe('<ExonEdit />', () => {
  const exon = {
    name: 'exon 1',
    positionFrom: 10,
    positionTo: 20,
  };

  it('renders an exon edition form', () => {
    const wrapper = shallow(
      <ExonEdit
        exon={exon}
        onEditExon={() => {}}
        onRemoveExon={() => {}}
        onActionEditCancelClick={() => {}}
      />
    );

    expect(wrapper.find(ExonForm)).to.have.length(1);
  });

  it('fires exon edition canceling', () => {
    const spy = sinon.spy();
    const wrapper = mount(
      <ExonEdit
        exon={exon}
        onEditExon={() => {}}
        onRemoveExon={() => {}}
        onActionEditCancelClick={spy}
      />
    );

    wrapper.find('input[type="reset"]').simulate('click');
    expect(spy.calledOnce).to.be.true;
  });

  it('submits edited exon', () => {
    const spy = sinon.spy();
    const wrapper = mount(
      <ExonEdit
        exon={exon}
        onEditExon={spy}
        onRemoveExon={() => {}}
        onActionEditCancelClick={() => {}}
      />
    );

    wrapper.find('input[type="number"]').at(0).simulate('change', {
      persist: () => {},
      target: {
        value: 11,
      },
    });
    wrapper.find('input[type="number"]').at(1).simulate('change', {
      persist: () => {},
      target: {
        value: 23,
      },
    });
    wrapper.find('input[type="text"]').simulate('change', {
      persist: () => {},
      target: {
        value: 'exon 2',
      },
    });
    wrapper.find('.button.submit').simulate('click');

    expect(spy.calledOnce).to.be.true;
    expect(
      spy.calledWith({
        name: 'exon 2',
        positionFrom: 11,
        positionTo: 23,
      })
    ).to.be.true;
  });
});
