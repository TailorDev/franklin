import React, { PropTypes } from 'react';

import Nucleotide from './Nucleotide';

const { array } = PropTypes;


const Sequence = (props) => (
  <g>
    {props.sequence.map((nucleotide, index) =>
      <Nucleotide
        x={5 + (12 * index)}
        y={30}
        type={nucleotide}
        position={index + 1}
        key={index}
      />
    )}
  </g>
);

Sequence.propTypes = {
  sequence: array.isRequired,
  // TODO: add other attrs, cf. https://github.com/TailorDev/franklin/issues/3
};

export default Sequence;
