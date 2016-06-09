import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import Immutable from 'immutable';
import { defaultLabels } from '../../defaults';
import sinon from 'sinon';

// see: https://github.com/mochajs/mocha/issues/1847
const { describe, it } = global;

import Annotation from '../Annotation';

describe('<Annotation />', () => {

  const controller = {
    on: () => {},
    dispatch: sinon.spy(),
  };

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
      />,
      { context: { controller } }
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
      />,
      { context: { controller } }
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
      />,
      { context: { controller } }
    );

    expect(wrapper.find('g')).to.have.length(1);
    expect(wrapper.find('line')).to.have.length(1);
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
      />,
      { context: { controller } }
    );

    expect(wrapper.find('g')).to.have.length(1);
    expect(wrapper.find('line')).to.have.length(0);

    // test starts here
    wrapper.setProps({ getAnnotationSegments: () => { return segments; } });

    expect(wrapper.find('line')).to.have.length(1);
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
      />,
      { context: { controller } }
    );

    wrapper.find('g').simulate('click');
    expect(controller.dispatch.calledOnce).to.be.true;
  });
});
