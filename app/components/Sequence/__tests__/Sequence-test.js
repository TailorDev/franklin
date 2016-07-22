import React from 'react';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import Immutable from 'immutable';
import sinon from 'sinon';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

// see: https://github.com/mochajs/mocha/issues/1847
const { describe, it } = global;

import Sequence from '../';
import Nucleotide from '../../Nucleotide';

describe('<Sequence />', () => {

  const sequence = new Immutable.List('ATTTGCGTCG'.split(''));

  const mockStore = configureStore();
  const initialState = {
    label: { annotation: '' },
    selection: { selections: [] },
    exon: { exons: new Immutable.List() },
    sequence: { positionFrom: 1 },
  };

  it('renders as many Nucleotide as needed', () => {
    // Using `<Provider>` is probably not a good idea but it does not work
    // otherwise...
    // cf. https://github.com/airbnb/enzyme/issues/472
    // cf. https://github.com/airbnb/enzyme/issues/183
    const wrapper = mount(
      <Provider store={mockStore(initialState)}>
        <Sequence
          sequence={sequence}
          visualizerMargin={{x: 10, y: 10}}
          nucleotidesPerRow={5}
          nucleotidesRowHeight={50}
          nucleotideWidth={12}
          trackHeight={6}
          rowHeight={50}
          positionFrom={0}
          onNucleotideClick={() => {}}
        />
      </Provider>
    );

    expect(wrapper.find('.nucleotide')).to.have.length(sequence.size);
  });

  it('updates selection upon nucleotide click', () => {
    const spy = sinon.spy();
    const wrapper = mount(
      <Provider store={mockStore(initialState)}>
        <Sequence
          sequence={sequence}
          visualizerMargin={{x: 10, y: 10}}
          nucleotidesPerRow={80}
          nucleotidesRowHeight={50}
          nucleotideWidth={12}
          trackHeight={6}
          rowHeight={50}
          positionFrom={0}
          onNucleotideClick={spy}
        />
      </Provider>
    );
    wrapper.find('.nucleotide').first().simulate('click');
    expect(wrapper.find('.position')).to.have.length(sequence.size);
    expect(spy.calledOnce).to.be.true;
    expect(spy.calledWith(0)).to.be.true;
  });

  it('cancels selection with a double click', () => {
    const spy = sinon.spy();
    const wrapper = mount(
      <Provider store={mockStore(initialState)}>
        <Sequence
          sequence={sequence}
          visualizerMargin={{x: 10, y: 10}}
          nucleotidesPerRow={80}
          nucleotidesRowHeight={50}
          nucleotideWidth={12}
          trackHeight={6}
          rowHeight={50}
          positionFrom={0}
          onNucleotideClick={spy}
        />
      </Provider>
    );
    wrapper.find('.nucleotide').at(2).simulate('click');
    wrapper.find('.nucleotide').at(2).simulate('click');
    expect(spy.calledTwice).to.be.true;
    expect(spy.calledWith(2)).to.be.true;
  });
});
