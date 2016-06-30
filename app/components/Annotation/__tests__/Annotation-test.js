import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import Immutable from 'immutable';
import { defaultLabels } from '../../../defaults';
import sinon from 'sinon';

// see: https://github.com/mochajs/mocha/issues/1847
const { describe, it } = global;

import Annotation from '../presenter';

describe('<Annotation />', () => {

  it('renders itself', () => {
    const labelId = 0;
    const label = defaultLabels.get(labelId);
    const annotation = label.annotations.first();
    const segments = [];

    const wrapper = shallow(
      <Annotation
        annotation={annotation}
        label={label}
        labelId={labelId}
        getAnnotationSegments={() => { return segments; }}
        isSelected={false}
        onClick={() => {}}
      />
    );

    expect(wrapper.find('g')).to.have.length(1);
    expect(wrapper.find('line')).to.have.length(0);
  });

  it('is inactive if label is inactive', () => {
    const labelId = 0;
    const label = defaultLabels.get(labelId);
    const annotation = label.annotations.first();
    const segments = [];

    label.isActive = false;

    const wrapper = shallow(
      <Annotation
        annotation={annotation}
        label={label}
        labelId={labelId}
        getAnnotationSegments={() => { return segments; }}
        isSelected={false}
        onClick={() => {}}
      />
    );

    expect(wrapper.find('g').hasClass('inactive')).to.be.true;
  });

  it('renders segments on mount', () => {
    const labelId = 0;
    const label = defaultLabels.get(labelId);
    const annotation = label.annotations.first();
    const segments = [
      { x1: 0, y1: 0, x2: 5, y2: 0 },
    ];

    const wrapper = shallow(
      <Annotation
        annotation={annotation}
        label={label}
        labelId={labelId}
        getAnnotationSegments={() => { return segments; }}
        isSelected={false}
        onClick={() => {}}
      />
    );

    expect(wrapper.find('g')).to.have.length(2);
    expect(wrapper.find('line')).to.have.length(2);
  });

  it('renders segments when new props are received', () => {
    const labelId = 0;
    const label = defaultLabels.get(labelId);
    const annotation = label.annotations.first();
    const segments = [
      { x1: 0, y1: 0, x2: 5, y2: 0 },
    ];

    const wrapper = shallow(
      <Annotation
        annotation={annotation}
        label={label}
        labelId={labelId}
        getAnnotationSegments={() => { return []; }}
        isSelected={false}
        onClick={() => {}}
      />
    );

    expect(wrapper.find('g')).to.have.length(1);
    expect(wrapper.find('line')).to.have.length(0);

    // test starts here
    wrapper.setProps({ getAnnotationSegments: () => { return segments; } });

    expect(wrapper.find('line')).to.have.length(2);
  });

  it('dispatches an action on click', () => {
    const labelId = 0;
    const label = defaultLabels.get(labelId);
    const annotation = label.annotations.first();
    const segments = [
      { x1: 0, y1: 0, x2: 5, y2: 0 },
    ];

    const wrapper = shallow(
      <Annotation
        annotation={annotation}
        label={label}
        labelId={labelId}
        getAnnotationSegments={() => { return segments; }}
        isSelected={false}
        onClick={() => {}}
      />
    );

    wrapper.find('g').first().simulate('click');
  });

  it('should NOT render the tick if annotation is a unit (dimension == 1)', () => {
    const labelId = 0;
    const label = defaultLabels.get(labelId);
    const segments = [
      { x1: 0, y1: 0, x2: 0, y2: 5 },
    ];

    // force same positions
    const annotation = Object.assign({}, label.annotations.first(), {
      positionFrom: 1,
      positionTo: 1,
    });

    const wrapper = shallow(
      <Annotation
        annotation={annotation}
        label={label}
        labelId={labelId}
        getAnnotationSegments={() => { return segments; }}
        isSelected={false}
        onClick={() => {}}
      />
    );

    expect(wrapper.find('g')).to.have.length(2);
    expect(wrapper.find('line')).to.have.length(1);
    expect(wrapper.find('.annotation-tick')).to.have.length(0);
  });

  it('should render a tick', () => {
    const labelId = 0;
    const label = defaultLabels.get(labelId);
    const annotation = label.annotations.first();
    const segments = [
      { x1: 0, y1: 1, x2: 0, y2: 5 },
    ];

    const wrapper = shallow(
      <Annotation
        annotation={annotation}
        label={label}
        labelId={labelId}
        getAnnotationSegments={() => { return segments; }}
        isSelected={false}
        onClick={() => {}}
      />
    );

    expect(wrapper.find('g')).to.have.length(2);
    expect(wrapper.find('line')).to.have.length(2);
    expect(wrapper.find('.annotation-tick.forward')).to.have.length(1);
    expect(wrapper.find('.annotation-tick.reverse')).to.have.length(0);
  });

  it('should render a tick with multiple segments', () => {
    const labelId = 0;
    const label = defaultLabels.get(labelId);
    const annotation = label.annotations.first();
    const segments = [
      { x1: 0, y1: 1, x2: 0, y2: 5 },
      { x1: 1, y1: 2, x2: 1, y2: 6 },
    ];

    const wrapper = shallow(
      <Annotation
        annotation={annotation}
        label={label}
        labelId={labelId}
        getAnnotationSegments={() => { return segments; }}
        isSelected={false}
        onClick={() => {}}
      />
    );

    expect(wrapper.find('g')).to.have.length(3);
    expect(wrapper.find('line')).to.have.length(3);
    expect(wrapper.find('.annotation-tick.forward')).to.have.length(1);
    expect(wrapper.find('.annotation-tick.reverse')).to.have.length(0);
  });

  it('should render a tick for reverse annotation', () => {
    const labelId = 0;
    const label = defaultLabels.get(labelId);
    const segments = [
      { x1: 0, y1: 1, x2: 0, y2: 5 },
      { x1: 1, y1: 2, x2: 1, y2: 6 },
    ];

    const annotation = Object.assign({}, label.annotations.first(), {
      positionFrom: 10,
      positionTo: 1,
    });

    const wrapper = shallow(
      <Annotation
        annotation={annotation}
        label={label}
        labelId={labelId}
        getAnnotationSegments={() => { return segments; }}
        isSelected={false}
        onClick={() => {}}
      />
    );

    expect(wrapper.find('g')).to.have.length(3);
    expect(wrapper.find('line')).to.have.length(3);
    expect(wrapper.find('.annotation-tick.forward')).to.have.length(0);
    expect(wrapper.find('.annotation-tick.reverse')).to.have.length(1);
  });
});
