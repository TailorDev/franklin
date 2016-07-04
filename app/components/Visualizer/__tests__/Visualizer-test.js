import React from 'react';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import Immutable from 'immutable';
import sinon from 'sinon';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

// see: https://github.com/mochajs/mocha/issues/1847
const { describe, it } = global;

import Visualizer from '../presenter';
import Help from '../Help';
import { defaultLabels } from '../../../defaults';

describe('<Visualizer />', () => {

  const sequence = new Immutable.List('ATTTGCGTCG'.split(''));

  const mockStore = configureStore();
  const initialState = {
    label: { annotation: '' },
    selection: { selections: [] },
    exon: { exons: new Immutable.List() },
    sequence: { positionFrom: 123 },
  };

  it('renders a SVG element with appropriate dimensions', () => {
    const wrapper = shallow(
      <Visualizer
        sequence={sequence}
        labels={defaultLabels}
        onFileSelectClick={() => {}}
        positionFrom={1}
        onNucleotideClick={() => {}}
      />
    );

    expect(wrapper.find('svg')).to.have.length(1);
    expect(wrapper.instance().state.width).to.equal('100%');
    expect(wrapper.instance().state.height).to.equal('100%');
  });

  it('renders help panel if sequence is empty', () => {
    const wrapper = mount(
      <Visualizer
        sequence={new Immutable.List()}
        labels={defaultLabels}
        onFileSelectClick={() => {}}
        positionFrom={1}
        onNucleotideClick={() => {}}
      />
    );

    expect(wrapper.find(Help)).to.have.length(1);
    expect(wrapper.find('.help')).to.have.length(1);
    expect(wrapper.find('svg')).to.have.length(0);
  });

  it('adds a listener to window resize', () => {
    window.addEventListener = sinon.spy();

    const wrapper = mount(
      <Provider store={mockStore(initialState)}>
        <Visualizer
          sequence={sequence}
          labels={defaultLabels}
          onFileSelectClick={() => {}}
          positionFrom={1}
          onNucleotideClick={() => {}}
        />
      </Provider>
    );

    expect(window.addEventListener.calledWith('resize')).to.be.true;
  });

  it('removes the resize listener to window', () => {
    window.addEventListener = sinon.spy();
    window.removeEventListener = sinon.spy();

    const wrapper = mount(
      <Provider store={mockStore(initialState)}>
        <Visualizer
          sequence={sequence}
          labels={defaultLabels}
          onFileSelectClick={() => {}}
          positionFrom={1}
          onNucleotideClick={() => {}}
        />
      </Provider>
    );

    wrapper.unmount();

    expect(window.addEventListener.calledWith('resize')).to.be.true;

    const listener = window.addEventListener.args[0][1];

    expect(window.removeEventListener.calledWith('resize', listener)).to.be.true;
  });

  // SKIPPED
  it.skip('updates dimensions when receiving new props', () => {

    // Does not work because of:
    //  - https://github.com/airbnb/enzyme/issues/472
    //  - https://github.com/airbnb/enzyme/issues/183

    const wrapper = mount(
      <Visualizer
        sequence={sequence}
        labels={defaultLabels}
        onFileSelectClick={() => {}}
        positionFrom={1}
        onNucleotideClick={() => {}}
      />
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
