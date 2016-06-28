import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import Immutable from 'immutable';

// see: https://github.com/mochajs/mocha/issues/1847
const { describe, it } = global;

import { App } from '../App';
import Header from '../Header';

describe('<App />', () => {

  const version = 'dummy';

  it('renders Header component', () => {
    const wrapper = shallow(
      <App version={version} dispatch={() => {}} />
    );
    expect(wrapper.find(Header)).to.have.length(1);
  });
});
