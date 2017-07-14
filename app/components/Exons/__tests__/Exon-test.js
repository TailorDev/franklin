import React from 'react';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';

// see: https://github.com/mochajs/mocha/issues/1847
const { describe, it } = global;

import Exon from '../Exon';
import ExonEdit from '../ExonEdit';

describe('<Exon />', () => {
  const exon = {
    name: 'exon 1',
    positionFrom: 10,
    positionTo: 20,
  };

  it('renders an exon', () => {
    const wrapper = shallow(
      <Exon
        exon={exon}
        onEditExon={() => {}}
        onRemoveExon={() => {}}
        index={1}
      />
    );
    expect(wrapper.find('.exon')).to.have.length(1);
    expect(wrapper.find('.properties')).to.have.length(1);
    expect(wrapper.find('.name')).to.have.length(1);
    expect(wrapper.find('.position-from')).to.have.length(1);
    expect(wrapper.find('.position-to')).to.have.length(1);
  });

  it('can display the edition form', () => {
    const wrapper = shallow(
      <Exon
        exon={exon}
        onEditExon={() => {}}
        onRemoveExon={() => {}}
        index={1}
      />
    );

    expect(wrapper.instance().state.displayEditForm).to.be.false;
    expect(wrapper.find(ExonEdit)).to.have.length(0);
    wrapper.find('.properties').simulate('click');
    expect(wrapper.instance().state.displayEditForm).to.be.true;
    expect(wrapper.find(ExonEdit)).to.have.length(1);
  });

  it('can cancel edition', () => {
    const wrapper = mount(
      <Exon
        exon={exon}
        onEditExon={() => {}}
        onRemoveExon={() => {}}
        index={1}
      />
    );

    wrapper.find('.properties').simulate('click');
    expect(wrapper.find('input[type="reset"]')).to.have.length(1);
    wrapper.find('input[type="reset"]').simulate('click');
    expect(wrapper.instance().state.displayEditForm).to.be.false;
    expect(wrapper.find(ExonEdit)).to.have.length(0);
  });

  it('can be edited', () => {
    const spy = sinon.spy();
    const wrapper = mount(
      <Exon exon={exon} onEditExon={spy} onRemoveExon={() => {}} index={1} />
    );

    wrapper.find('.properties').simulate('click');
    expect(wrapper.find('input[type="submit"]')).to.have.length(1);
    wrapper.find('input[type="submit"]').simulate('click');
    expect(spy.calledOnce).to.be.true;
  });

  it('can display the deletion form', () => {
    const wrapper = mount(
      <Exon
        exon={exon}
        onEditExon={() => {}}
        onRemoveExon={() => {}}
        index={1}
      />
    );

    wrapper.find('.properties').simulate('click');
    expect(wrapper.find('button.remove')).to.have.length(1);
    wrapper.find('button.remove').simulate('click');
    expect(wrapper.find('.action-remove')).to.have.length(1);
    expect(wrapper.find('.action-remove .button.remove')).to.have.length(1);
  });

  it('can cancel deletion', () => {
    const wrapper = mount(
      <Exon
        exon={exon}
        onEditExon={() => {}}
        onRemoveExon={() => {}}
        index={1}
      />
    );

    wrapper.find('.properties').simulate('click');
    wrapper.find('button.remove').simulate('click');
    wrapper.find('.action-remove .button.cancel').simulate('click');
    expect(wrapper.find('.action-remove')).to.have.length(0);
  });

  it('can be deleted', () => {
    const spy = sinon.spy();
    const wrapper = mount(
      <Exon exon={exon} onEditExon={() => {}} onRemoveExon={spy} index={1} />
    );

    wrapper.find('.properties').simulate('click');
    wrapper.find('button.remove').simulate('click');
    wrapper.find('.action-remove .button.remove').simulate('click');
    expect(spy.calledOnce).to.be.true;
  });
});
