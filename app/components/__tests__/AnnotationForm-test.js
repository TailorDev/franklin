import React from 'react';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import Immutable from 'immutable';
import sinon from 'sinon';

import AnnotationForm from '../AnnotationForm/presenter';
import { defaultLabels } from '../../defaults';

describe('<AnnotationForm />', () => {
  const sequence = new Immutable.List('ATTTGCGTCG'.split(''));

  it('renders an annotation form', () => {
    const wrapper = shallow(
      <AnnotationForm
        sequence={sequence}
        labels={defaultLabels}
        onSubmit={() => {}}
        updateSelectionFrom={() => {}}
        updateSelectionTo={() => {}}
      />
    );

    expect(wrapper.find('input[type="submit"]')).to.have.length(1);
    expect(wrapper.find('input[type="number"]')).to.have.length(2);
    expect(wrapper.find('select')).to.have.length(1);
    expect(wrapper.find('textarea')).to.have.length(1);
  });

  it('updates annotation form with selection', () => {
    const selection = {from: 2, to: 4};
    const wrapper = mount(
      <AnnotationForm
        sequence={sequence}
        labels={defaultLabels}
        onSubmit={() => {}}
        updateSelectionFrom={() => {}}
        updateSelectionTo={() => {}}
      />
    );

    wrapper.instance().onSelectionChange(selection);

    expect(wrapper.find('input[type="number"][value=3]')).to.have.length(1);
    expect(wrapper.find('input[type="number"][value=5]')).to.have.length(1);
  });

  it('updates annotation form with partial selection', () => {
    const selection = {from: 2, to: undefined};
    const wrapper = mount(
      <AnnotationForm
        sequence={sequence}
        labels={defaultLabels}
        onSubmit={() => {}}
        updateSelectionFrom={() => {}}
        updateSelectionTo={() => {}}
      />
    );

    wrapper.instance().onSelectionChange(selection);

    expect(wrapper.find('input[type="number"][value=3]')).to.have.length(1);
    expect(wrapper.find({placeholder:"To", type:"number", value:''})).to.have.length(1);
  });
});
