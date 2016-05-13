import React, { PropTypes } from 'react';

import Sequence from './Sequence';

const { array } = PropTypes;


const rectStyle = {
  fill: '#f6f6f6',
};

const Visualizer = (props) =>
  <svg
    version="1.1"
    baseProfile="full"
    width="75%"
    height="600"
    xmlns="http://www.w3.org/2000/svg"
    className="visualizer"
  >
    <rect width="100%" height="100%" style={rectStyle} rx="5" />

    <Sequence nucleotides={props.nucleotides} />
  </svg>
;

Visualizer.propTypes = {
  nucleotides: array.isRequired
};

export default Visualizer;
