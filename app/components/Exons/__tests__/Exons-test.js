import React from 'react';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import Immutable from 'immutable';
import sinon from 'sinon';

// see: https://github.com/mochajs/mocha/issues/1847
const { describe, it } = global;

import Exons from '../presenter';
import Exon from '../Exon';

describe('<Exons />', () => {
  const exons = Immutable.List([
    { name: 'exon 1', positionFrom: 10, positionTo: 20 },
    { name: 'exon 2', positionFrom: 40, positionTo: 50 },
    { name: 'exon 3', positionFrom: 70, positionTo: 80 },
  ]);

  it('renders a list of exons', () => {
    const wrapper = shallow(
      <Exons
        exons={exons}
        onEditExon={() => {}}
        onRemoveExon={() => {}}
        onCreateNewExon={() => {}}
      />
    );

    expect(wrapper.find(Exon)).to.have.length(exons.size);
  });

  it('allows to create new exons', () => {
    const spy = sinon.spy();
    const wrapper = mount(
      <Exons
        exons={exons}
        onEditExon={() => {}}
        onRemoveExon={() => {}}
        onCreateNewExon={spy}
      />
    );

    wrapper.find('button.new-exon').simulate('click');
    wrapper.find('input[type="number"]').at(0).simulate('change', {
      persist: () => {},
      target: {
        value: 54,
      },
    });
    wrapper.find('input[type="number"]').at(1).simulate('change', {
      persist: () => {},
      target: {
        value: 62,
      },
    });
    wrapper.find('input[type="text"]').simulate('change', {
      persist: () => {},
      target: {
        value: 'exon 4',
      },
    });
    wrapper.find('.button.submit').simulate('click');

    expect(spy.calledOnce).to.be.true;
    expect(
      spy.calledWith({
        name: 'exon 4',
        positionFrom: 54,
        positionTo: 62,
      })
    ).to.be.true;
  });
});
