import React, { PropTypes } from 'react';

import Nucleotide from './Nucleotide';

const { array } = PropTypes;


const Sequence = (props) => (
  <g>
    {props.nucleotides.map((nucleotide, index) =>
      <Nucleotide
        x={5 + (12 * index)}
        y={30}
        type={nucleotide}
        position={0}
        key={index}
      />
    )}
  </g>
);

Sequence.propTypes = {
  nucleotides: array.isRequired,
  // TODO: add other attrs, cf. https://github.com/TailorDev/franklin/issues/3
};

export default Sequence;
