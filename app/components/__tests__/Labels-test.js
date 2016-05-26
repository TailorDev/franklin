import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import Immutable from 'immutable';
import sinon from 'sinon';

// see: https://github.com/mochajs/mocha/issues/1847
const { describe, it } = global;

import Labels from '../Labels';
import Label from '../Label';


describe('<Labels />', () => {

  const dummyLabels = Immutable.List([
    { name: 'label 1', color: '#000' },
    { name: 'label 2', color: '#fff' },
  ]);

  it('renders a list of labels', () => {
    const wrapper = shallow(
      <Labels
        labels={dummyLabels}
        onCreateNewLabel={() => {}}
      />
    );

    expect(wrapper.find(Label)).to.have.length(dummyLabels.size);
  });

  it('allows to create new labels', () => {
    const spy = sinon.spy();
    const wrapper = shallow(
      <Labels
        labels={dummyLabels}
        onCreateNewLabel={spy}
      />
    );

    wrapper.find('input[type="text"]').simulate('change', {
      persist: () => {},
      target: {
        value: 'foo'
      }
    });
    wrapper.find('.button').simulate('click');

    expect(spy.calledOnce).to.be.true;
    expect(spy.calledWith({ name: 'foo', color: '#f6f6f6' })).to.be.true;
  });
});
