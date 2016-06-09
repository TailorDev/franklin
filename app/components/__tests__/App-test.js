import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';
import Immutable from 'immutable';

// see: https://github.com/mochajs/mocha/issues/1847
const { describe, it } = global;

import App from '../App';
import Header from '../Header';

describe('<App />', () => {

  const version = 'dummy';

  const controller = {
    on: () => {},
    dispatch: () => {},
    getState: () => {
      return {
        sequence: new Immutable.List(),
        labels: new Immutable.List(),
        positionFrom: 0,
      };
    },
  };

  it('renders Header component', () => {
    const wrapper = mount(
      <App
        version={version}
        controller={controller}
      />
    );
    expect(wrapper.find(Header)).to.have.length(1);
  });
});
