import React from 'react';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import Immutable from 'immutable';
import sinon from 'sinon';

import AnnotationForm from '../AnnotationForm/presenter';
import Remove from '../AnnotationForm/Remove';
import { defaultLabels } from '../../defaults';

describe('<AnnotationForm />', () => {
  const sequence = new Immutable.List('ATTTGCGTCG'.split(''));

  it('renders an annotation form', () => {
    const wrapper = shallow(
      <AnnotationForm
        sequence={sequence}
        labels={defaultLabels}
        onSubmit={() => {}}
        onRemove={() => {}}
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
        onRemove={() => {}}
        updateSelectionFrom={() => {}}
        updateSelectionTo={() => {}}
      />
    );

    wrapper.setProps({ selection });

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
        onRemove={() => {}}
        updateSelectionFrom={() => {}}
        updateSelectionTo={() => {}}
      />
    );

    wrapper.setProps({ selection });

    expect(wrapper.find('input[type="number"][value=3]')).to.have.length(1);
    expect(wrapper.find({placeholder:"To", type:"number", value:''})).to.have.length(1);
  });

  it('does not show remove button if no annotation is under edition', () => {
    const selection = {from: undefined, to: undefined};
    const wrapper = mount(
      <AnnotationForm
        sequence={sequence}
        labels={defaultLabels}
        onSubmit={() => {}}
        onRemove={() => {}}
        updateSelectionFrom={() => {}}
        updateSelectionTo={() => {}}
      />
    );

    expect(wrapper.find('.remove')).to.have.length(0);
  });

  it('shows remove button if an annotation is under edition', () => {
    const selection = {from: 10, to: 20};
    const current = {
      labelId: 123,
      annotationId: 456,
      annotation: {
        positionFrom: 10,
        positionTo: 20,
        comment: '',
      }
    };

    const wrapper = mount(
      <AnnotationForm
        sequence={sequence}
        labels={defaultLabels}
        onSubmit={() => {}}
        onRemove={() => {}}
        updateSelectionFrom={() => {}}
        updateSelectionTo={() => {}}
      />
    );

    wrapper.setProps({
      current,
      selection
    });

    expect(wrapper.find('.remove')).to.have.length(1);
  });

  it('displays the Remove component on "remove" button click', () => {
    const selection = {from: 10, to: 20};
    const current = {
      labelId: 123,
      annotationId: 456,
      annotation: {
        positionFrom: 10,
        positionTo: 20,
        comment: '',
      }
    };

    const wrapper = mount(
      <AnnotationForm
        sequence={sequence}
        labels={defaultLabels}
        onSubmit={() => {}}
        onRemove={() => {}}
        updateSelectionFrom={() => {}}
        updateSelectionTo={() => {}}
      />
    );

    wrapper.setProps({
      current,
      selection
    });

    expect(wrapper.find('.remove')).to.have.length(1);
    expect(wrapper.find(Remove)).to.have.length(0);

    wrapper.find('.remove').simulate('click');

    expect(wrapper.find(Remove)).to.have.length(1);
  });
});
