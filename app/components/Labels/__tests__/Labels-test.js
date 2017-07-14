import React from 'react';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import Immutable from 'immutable';
import sinon from 'sinon';

// see: https://github.com/mochajs/mocha/issues/1847
const { describe, it } = global;

import Labels from '../presenter';
import Label from '../Label';

describe('<Labels />', () => {
  const dummyLabels = Immutable.List([
    {
      name: 'label 1',
      color: '#000',
      isActive: true,
      annotations: Immutable.List(),
    },
    {
      name: 'label 2',
      color: '#fff',
      isActive: true,
      annotations: Immutable.List(),
    },
  ]);

  it('renders a list of labels', () => {
    const wrapper = shallow(
      <Labels
        labels={dummyLabels}
        onCreateNewLabel={() => {}}
        onToggleLabel={() => {}}
        onEditLabel={() => {}}
        onRemoveLabel={() => {}}
      />
    );

    expect(wrapper.find(Label)).to.have.length(dummyLabels.size);
  });

  it('allows to create new labels', () => {
    const spy = sinon.spy();
    const wrapper = mount(
      <Labels
        labels={dummyLabels}
        onCreateNewLabel={spy}
        onToggleLabel={() => {}}
        onEditLabel={() => {}}
        onRemoveLabel={() => {}}
      />
    );

    wrapper.find('button.new-label').simulate('click');
    wrapper.find('input[type="text"]').simulate('change', {
      persist: () => {},
      target: {
        value: 'foo',
      },
    });
    wrapper.find('.button.submit').simulate('click');

    expect(spy.calledOnce).to.be.true;
    expect(
      spy.calledWith({
        name: 'foo',
        color: '#0F157B',
        isActive: true,
        annotations: Immutable.List(),
      })
    ).to.be.true;
  });
});
