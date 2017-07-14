import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

// see: https://github.com/mochajs/mocha/issues/1847
const { describe, it } = global;

import Search from '../presenter';

describe('<Search />', () => {
  it('renders itself', () => {
    const wrapper = shallow(
      <Search onChange={() => {}} ntSequence={{}} value={''} matches={0} />
    );

    expect(wrapper.find('.search')).to.have.length(1);
    expect(wrapper.find('input')).to.have.length(1);
    expect(wrapper.find('.matches')).to.have.length(0);
  });

  it('should be enabled when ntSequence is NOT null', () => {
    const wrapper = shallow(
      <Search onChange={() => {}} ntSequence={{}} value={''} matches={0} />
    );

    expect(wrapper.find('input').prop('disabled')).to.be.false;
  });

  it('should be disabled when ntSequence is null', () => {
    const wrapper = shallow(
      <Search onChange={() => {}} ntSequence={null} value={''} matches={0} />
    );

    expect(wrapper.find('input').prop('disabled')).to.be.true;
  });

  it('hides the matches counter when search is empty', () => {
    const wrapper = shallow(
      <Search onChange={() => {}} ntSequence={null} value={''} matches={1} />
    );

    expect(wrapper.find('.matches')).to.have.length(0);
  });

  it('displays the matches counter when search is not empty', () => {
    const wrapper = shallow(
      <Search onChange={() => {}} ntSequence={null} value={'AT'} matches={1} />
    );

    expect(wrapper.find('.matches')).to.have.length(1);
    expect(wrapper.find('.matches').text()).to.equal('1 match');
  });

  it('adds a dedicated style to the matches counter when nothing matches', () => {
    const wrapper = shallow(
      <Search onChange={() => {}} ntSequence={null} value={'AT'} matches={0} />
    );

    expect(wrapper.find('.matches').text()).to.equal('0 match');
    expect(wrapper.find('.matches.none')).to.have.length(1);
  });

  it('pluralizes the matches counter', () => {
    const wrapper = shallow(
      <Search onChange={() => {}} ntSequence={null} value={'AT'} matches={2} />
    );
    expect(wrapper.find('.matches').text()).to.equal('2 matches');
  });
});
