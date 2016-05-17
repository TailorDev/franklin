import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

// see: https://github.com/mochajs/mocha/issues/1847
const { describe, it } = global;

import Sequence from '../Sequence';
import Nucleotide from '../Nucleotide';

describe('<Sequence />', () => {

  const sequence = 'ATCG'.split('');

  it('renders as many Nucleotide as needed', () => {
    const wrapper = shallow(
      <Sequence
        sequence={sequence}
      />
    );
    expect(wrapper.find(Nucleotide)).to.have.length(sequence.length);
  });
});
