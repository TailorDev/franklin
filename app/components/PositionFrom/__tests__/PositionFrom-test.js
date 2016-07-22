import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';

// see: https://github.com/mochajs/mocha/issues/1847
const { describe, it } = global;

import PositionFrom from '../../PositionFrom';


describe('<PositionFrom />', () => {

  it('renders itself', () => {
    const wrapper = mount(
      <PositionFrom
        value={123}
        onChange={() => {}}
      />
    );

    expect(wrapper.find('input[type="number"]')).to.have.length(1);
  });
});
