import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';

// see: https://github.com/mochajs/mocha/issues/1847
const { describe, it } = global;

import Sequence from '../Sequence';
import Nucleotide from '../Nucleotide';

describe('<Sequence />', () => {

  const sequence = 'ATTTGCGTCG'.split('');

  it('renders as many Nucleotide as needed', () => {
    const wrapper = mount(
      <Sequence
        sequence={sequence}
        nucleotidesPerRow={5}
        rowHeight={50}
        nucleotideWidth={12}
      />
    );
    expect(wrapper.find(Nucleotide)).to.have.length(sequence.length);
    expect(wrapper.find('.nucleotide')).to.have.length(sequence.length);
  });

  it('renders multiple rows when needed', () => {
    const wrapper = mount(
      <Sequence
        sequence={sequence}
        nucleotidesPerRow={5}
        rowHeight={50}
        nucleotideWidth={12}
      />
    );
    expect(wrapper.find(Nucleotide).at(0).prop('x')).to.equal(10);
    expect(wrapper.find(Nucleotide).at(0).prop('y')).to.equal(10);
    expect(wrapper.find(Nucleotide).at(1).prop('x')).to.equal(22);
    expect(wrapper.find(Nucleotide).at(1).prop('y')).to.equal(10);
    expect(wrapper.find(Nucleotide).at(5).prop('x')).to.equal(10);
    expect(wrapper.find(Nucleotide).at(5).prop('y')).to.equal(60);
    expect(wrapper.find(Nucleotide).at(6).prop('x')).to.equal(22);
    expect(wrapper.find(Nucleotide).at(6).prop('y')).to.equal(60);
  });

  it('updates selection upon nucleotide click', () => {
    const wrapper = mount(
      <Sequence
        sequence={sequence}
        nucleotidesPerRow={80}
        rowHeight={50}
        nucleotideWidth={12}
      />
    );
    wrapper.find('.nucleotide').first().simulate('click');
    expect(wrapper.find('.position')).to.have.length(sequence.length);
    expect(wrapper.find('.position.selected')).to.have.length(1);
    expect(wrapper.instance().state.selection.size).to.equal(1);
    expect(wrapper.instance().state.selection.get(0)).to.equal(0);
  });

  it('cancels selection with a double click', () => {
    const wrapper = mount(
      <Sequence
        sequence={sequence}
        nucleotidesPerRow={80}
        rowHeight={50}
        nucleotideWidth={12}
      />
    );
    wrapper.find('.nucleotide').first().simulate('click');
    wrapper.find('.nucleotide').first().simulate('click');
    expect(wrapper.find('.position')).to.have.length(sequence.length);
    expect(wrapper.find('.position.selected')).to.have.length(0);
    expect(wrapper.instance().state.selection.size).to.equal(0);
  });

  it('limits selection to two positions', () => {
    const wrapper = mount(
      <Sequence
        sequence={sequence}
        nucleotidesPerRow={80}
        rowHeight={50}
        nucleotideWidth={12}
      />
    );
    wrapper.find('.nucleotide').first().simulate('click');
    expect(wrapper.find('.position.selected')).to.have.length(1);

    wrapper.find('.nucleotide').at(2).simulate('click');
    expect(wrapper.find('.position.selected')).to.have.length(2);
    expect(wrapper.instance().state.selection.size).to.equal(2);
    expect(wrapper.instance().state.selection.toArray()).to.deep.equal([0, 2]);

    wrapper.find('.nucleotide').at(8).simulate('click');
    expect(wrapper.find('.position.selected')).to.have.length(2);
    expect(wrapper.instance().state.selection.size).to.equal(2);
    expect(wrapper.instance().state.selection.toArray()).to.deep.equal([2, 8]);

    wrapper.find('.nucleotide').at(6).simulate('click');
    expect(wrapper.find('.position.selected')).to.have.length(2);
    expect(wrapper.instance().state.selection.size).to.equal(2);
    expect(wrapper.instance().state.selection.toArray()).to.deep.equal([8, 6]);
  });

  it('highlights selection range', () => {
    const wrapper = mount(
      <Sequence
        sequence={sequence}
        nucleotidesPerRow={80}
        rowHeight={50}
        nucleotideWidth={12}
      />
    );
    wrapper.find('.nucleotide').first().simulate('click');
    wrapper.find('.nucleotide').last().simulate('click');
    expect(wrapper.find('.type')).to.have.length(sequence.length);
    expect(wrapper.find('.type.in-selection')).to.have.length(sequence.length);

    wrapper.find('.nucleotide').at(1).simulate('click');
    wrapper.find('.nucleotide').at(8).simulate('click');
    expect(wrapper.find('.type')).to.have.length(sequence.length);
    expect(wrapper.find('.type.in-selection')).to.have.length(8);
  });
});
