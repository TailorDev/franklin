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
        value={''}
      />
    );

    expect(wrapper.find('.search-panel')).to.have.length(1);
    expect(wrapper.find('input')).to.have.length(1);
  });

  it('should be enabled when ntSequence is NOT null', () => {
    const wrapper = shallow(
      <Search
        onChange={() => {}}
        ntSequence={{}}
        value={''}
      />
    );

    expect(wrapper.find('input').prop('disabled')).to.be.false;
  });

  it('should be disabled when ntSequence is null', () => {
    const wrapper = shallow(
      <Search
        onChange={() => {}}
        ntSequence={null}
        value={''}
      />
    );

    expect(wrapper.find('input').prop('disabled')).to.be.true;
  });
});
