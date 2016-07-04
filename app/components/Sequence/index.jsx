import React, { PropTypes } from 'react';
import Immutable from 'immutable';

import Nucleotide from '../Nucleotide';

const { func, object, instanceOf, number } = PropTypes;

const Sequence = (props) => (
  <g>
    {props.sequence.map((nucleotide, index) =>
      <Nucleotide
        type={nucleotide}
        position={props.positionFrom + index}
        key={index}
        index={index}
        onClick={props.onNucleotideClick}
        {...props}
      />
    )}
  </g>
);

Sequence.propTypes = {
  sequence: instanceOf(Immutable.List).isRequired,
  positionFrom: number.isRequired,
  visualizerMargin: object.isRequired,
  nucleotidesPerRow: number.isRequired,
  nucleotidesRowHeight: number.isRequired,
  nucleotideWidth: number.isRequired,
  trackHeight: number.isRequired,
  rowHeight: number.isRequired,
  onNucleotideClick: func.isRequired,
  // TODO: add other attrs, cf. https://github.com/TailorDev/franklin/issues/3
};

export default Sequence;
