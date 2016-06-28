import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

// see: https://github.com/mochajs/mocha/issues/1847
const { describe, it } = global;

import Search from '../../Search/presenter';


describe('<Search />', () => {

  it('renders itself', () => {
    const wrapper = shallow(
      <Search
        onChange={() => {}}
        ntSequence={{}}
      />
    );

    expect(wrapper.find('.search-panel')).to.have.length(1);
    expect(wrapper.find('input')).to.have.length(1);
  });
});
