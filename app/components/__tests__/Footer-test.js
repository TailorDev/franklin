import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

// see: https://github.com/mochajs/mocha/issues/1847
const { describe, it } = global;

import Footer from '../Footer';


describe('<Footer />', () => {

  const version = 'dummy version';

  it('renders a footer element', () => {
    const wrapper = shallow(<Footer version={version} />);
    expect(wrapper.find('footer')).to.have.length(1);
  });

  it('renders a version block', () => {
    const wrapper = shallow(<Footer version={version} />);
    expect(wrapper.find('.version')).to.have.length(1);
    expect(wrapper.find('.git-ref')).to.have.length(1);
    expect(wrapper.find('.git-ref').text()).to.contain('dummy version');
  });
});
