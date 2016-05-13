import React, { PropTypes } from 'react';

const { number, string } = PropTypes;

const textStyle = {
  fontFamily: 'Consolas, Courier new',
  fontSize: '20',
  fill: '#333',
};

const Nucleotide = (props) => (
  <text x={props.x} y={props.y} style={textStyle}>
    {props.type}
  </text>
);

Nucleotide.propTypes = {
  x: number.isRequired,
  y: number.isRequired,
  // attributes
  type: string.isRequired,
  position: number.isRequired,
};

export default Nucleotide;
