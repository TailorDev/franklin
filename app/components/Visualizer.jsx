import React, { PropTypes } from 'react';

import Sequence from './Sequence';

const { array, number } = PropTypes;

const Visualizer = (props) =>
  <div className="visualizer">
    <svg
      version="1.1"
      baseProfile="full"
      width="100%"
      height="4000px"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="100%" height="100%" />

      <Sequence
        sequence={props.sequence}
        nucleotidesPerRow={props.nucleotidesPerRow}
      />
    </svg>
  </div>
;

Visualizer.propTypes = {
  sequence: array.isRequired,
  nucleotidesPerRow: number.isRequired,
};

export default Visualizer;
