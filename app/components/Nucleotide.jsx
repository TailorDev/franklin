import React, { PropTypes } from 'react';

const { number, string } = PropTypes;

const Nucleotide = (props) => (
  <g className="nucleotide" title="click to start selection">
    <rect x={props.x - 7} y="0" rx="2" ry="2" width="22" height="20" />
    <text x={props.x - 5} y="15" className="position">{props.position}</text>
    <rect x={props.x - 3} y="15" rx="5" ry="5" width="15" height="20" />

    <text x={props.x} y={props.y}>{props.type}</text>
  </g>
);

Nucleotide.propTypes = {
  x: number.isRequired,
  y: number.isRequired,
  // attributes
  type: string.isRequired,
  position: number.isRequired,
};

export default Nucleotide;
