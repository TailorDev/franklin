import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

// see: https://github.com/mochajs/mocha/issues/1847
const { describe, it } = global;

import Line from '../Line';


describe('<Line />', () => {

  it('renders itself', () => {
    const wrapper = shallow(
      <Line
        x1={0}
        y1={0}
        x2={1}
        y2={1}
        color={'#fff'}
        hasTick={false}
        isReverse={false}
      />
    );

    expect(wrapper.find('g')).to.have.length(1);
    expect(wrapper.find('line')).to.have.length(1);
    expect(wrapper.find('.annotation-tick')).to.have.length(0);
  });

  it('can render a tick', () => {
    const wrapper = shallow(
      <Line
        x1={0}
        y1={0}
        x2={1}
        y2={1}
        color={'#fff'}
        hasTick
        isReverse={false}
      />
    );

    expect(wrapper.find('g')).to.have.length(1);
    expect(wrapper.find('line')).to.have.length(2);
    expect(wrapper.find('.annotation-tick')).to.have.length(1);
    expect(wrapper.find('.annotation-tick.forward')).to.have.length(1);
  });

  it('can render a tick for a reverse annotation', () => {
    const wrapper = shallow(
      <Line
        x1={0}
        y1={0}
        x2={1}
        y2={1}
        color={'#fff'}
        hasTick
        isReverse
      />
    );

    expect(wrapper.find('g')).to.have.length(1);
    expect(wrapper.find('line')).to.have.length(2);
    expect(wrapper.find('.annotation-tick')).to.have.length(1);
    expect(wrapper.find('.annotation-tick.forward')).to.have.length(0);
    expect(wrapper.find('.annotation-tick.reverse')).to.have.length(1);
  });
});
