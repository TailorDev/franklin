import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import Immutable from 'immutable';

// see: https://github.com/mochajs/mocha/issues/1847
const { describe, it } = global;

import Toolbar from '../Toolbar/presenter';


describe('<Toolbar />', () => {

  const list = new Immutable.List();

  it('renders a panel', () => {
    const wrapper = shallow(
      <Toolbar
        name={''}
        sequence={list}
        labels={list}
      />
    );

    expect(wrapper.find('.toolbar')).to.have.length(1);
  });

  it('display the sequence name', () => {
    const wrapper = shallow(
      <Toolbar
        name={'NC_004350.2'}
        sequence={list}
        labels={list}
      />
    );

    expect(wrapper.find('.sequence-panel')).to.have.length(1);
    expect(wrapper.find('.sequence-panel').text()).to.contain('NC_004350.2');
  });
});
