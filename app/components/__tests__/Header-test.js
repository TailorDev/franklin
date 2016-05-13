import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

// see: https://github.com/mochajs/mocha/issues/1847
const { describe, it } = global;

import Header from '../Header';


describe('<Header />', () => {

  it('renders a header element', () => {
    const wrapper = shallow(<Header />);
    expect(wrapper.find('header')).to.have.length(1);
  });
});
