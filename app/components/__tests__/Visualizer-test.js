import React from 'react';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import Immutable from 'immutable';
import sinon from 'sinon';

// see: https://github.com/mochajs/mocha/issues/1847
const { describe, it } = global;

import Visualizer from '../Visualizer';
import { defaultLabels } from '../../defaults';

describe('<Visualizer />', () => {

  const sequence = new Immutable.List('ATTTGCGTCG'.split(''));

  const childContextTypes = { controller: React.PropTypes.object.isRequired };
  let context;

  before(() => {
    context = {
      controller: {
        on: () => {},
        dispatch: () => {},
      }
    };
  });

  it('renders a SVG element with appropriate dimensions', () => {
    const wrapper = mount(
      <Visualizer
        sequence={sequence}
        labels={defaultLabels}
        positionFrom={0}
      />,
      { context, childContextTypes }
    );

    expect(wrapper.find(Visualizer)).to.have.length(1);
    expect(wrapper.ref('wrapper')).to.have.length(1);
    expect(wrapper.find('svg')).to.have.length(1);
    expect(wrapper.instance().state.width).to.equal('100%');
    expect(wrapper.instance().state.height).to.equal('100%');
  });

  it('renders help panel if sequence is empty', () => {
    const wrapper = shallow(
      <Visualizer
        sequence={new Immutable.List()}
        labels={defaultLabels}
        positionFrom={0}
      />
    );

    expect(wrapper.find('.help')).to.have.length(1);
    expect(wrapper.find('svg')).to.have.length(0);
  });

  it('adds a listener to window resize', () => {
    window.addEventListener = sinon.spy();

    const wrapper = mount(
      <Visualizer
        sequence={sequence}
        labels={defaultLabels}
        positionFrom={0}
      />,
      { context, childContextTypes }
    );

    expect(window.addEventListener.calledWith('resize')).to.be.true;
  });

  it('updates dimensions when receiving new props', () => {
    const wrapper = mount(
      <Visualizer
        sequence={sequence}
        labels={defaultLabels}
        positionFrom={0}
      />,
      { context, childContextTypes }
    );

    expect(wrapper.state('nucleotidesPerRow')).to.equal(80);

    // test starts here
    wrapper.setProps({
      labels: defaultLabels,
      sequence: new Immutable.List(),
    });

    // Well... it works but we cannot assert something else since
    // it is not possible to get a valid value for `clientWidth` in
    // the method `updateVisualizerDimensions` of the component
    expect(wrapper.state('nucleotidesPerRow')).to.not.equal(80);
  });
});
