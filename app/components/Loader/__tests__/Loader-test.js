import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

// see: https://github.com/mochajs/mocha/issues/1847
const { describe, it } = global;

import Loader from '../presenter';


describe('<Loader />', () => {
  it('can be visible', () => {
    const wrapper = shallow(<Loader display />);

    expect(wrapper.html()).to.contain('display:block');
  });

  it('can be hidden', () => {
    const wrapper = shallow(<Loader display={false} />);

    expect(wrapper.html()).to.contain('display:none');
  });
});
