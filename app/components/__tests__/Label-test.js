import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

// see: https://github.com/mochajs/mocha/issues/1847
const { describe, it } = global;

import Label from '../Label';


describe('<Label />', () => {

  it('renders a list item', () => {
    const wrapper = shallow(
      <Label
        name={'foo'}
        color={'#b0b'}
      />
    );
    expect(wrapper.find('li')).to.have.length(1);
  });
});
