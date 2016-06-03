import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';
import Immutable from 'immutable';
import sinon from 'sinon';

// see: https://github.com/mochajs/mocha/issues/1847
const { describe, it } = global;

import Sequence from '../Sequence';
import Nucleotide from '../Nucleotide';

describe('<Sequence />', () => {

  const sequence = new Immutable.List('ATTTGCGTCG'.split(''));

  let context, spyOn, spyDispatch;

  beforeEach(() => {
    spyOn = sinon.spy();
    spyDispatch = sinon.spy();

    context = {
      controller: {
        on: spyOn,
        dispatch: spyDispatch,
      }
    };
  });

  it('renders as many Nucleotide as needed', () => {
    const wrapper = mount(
      <Sequence
        sequence={sequence}
        nucleotidesPerRow={5}
        rowHeight={50}
        nucleotideWidth={12}
      />,
      { context }
    );
    expect(wrapper.find(Nucleotide)).to.have.length(sequence.size);
    expect(wrapper.find('.nucleotide')).to.have.length(sequence.size);
  });

  it('updates selection upon nucleotide click', () => {
    const wrapper = mount(
      <Sequence
        sequence={sequence}
        nucleotidesPerRow={80}
        rowHeight={50}
        nucleotideWidth={12}
      />,
      { context }
    );
    wrapper.find('.nucleotide').first().simulate('click');
    expect(wrapper.find('.position')).to.have.length(sequence.size);
    expect(spyDispatch.calledOnce).to.be.true;
    expect(spyDispatch.calledWith('action:update-selection', {
      selected: 0,
    })).to.be.true;
  });

  it('cancels selection with a double click', () => {
    const wrapper = mount(
      <Sequence
        sequence={sequence}
        nucleotidesPerRow={80}
        rowHeight={50}
        nucleotideWidth={12}
      />,
      { context }
    );
    wrapper.find('.nucleotide').first().simulate('click');
    wrapper.find('.nucleotide').first().simulate('click');
    expect(spyDispatch.calledTwice).to.be.true;
    expect(spyDispatch.calledWith('action:update-selection', {
      selected: 0,
    })).to.be.true;
  });
});
