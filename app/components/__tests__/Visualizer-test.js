import React from 'react';
import { mount, render } from 'enzyme';
import { expect } from 'chai';

// see: https://github.com/mochajs/mocha/issues/1847
const { describe, it } = global;

import Visualizer from '../Visualizer';

describe('<Visualizer />', () => {

  const sequence = 'ATTTGCGTCG'.split('');

  it('renders a SVG element with appropriate dimensions', () => {
    const wrapper = mount(
      <Visualizer
        sequence={sequence}
      />
    );
    expect(wrapper.find(Visualizer)).to.have.length(1);
    expect(wrapper.ref('wrapper')).to.have.length(1);
    expect(wrapper.find('svg')).to.have.length(1);
    expect(wrapper.instance().state.visualizerWidth).to.equal('100%');
    expect(wrapper.instance().state.visualizerHeight).to.equal('100%');
  });
});
