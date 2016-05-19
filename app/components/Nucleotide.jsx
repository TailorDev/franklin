import React, { PropTypes } from 'react';

const { number, string } = PropTypes;

const Nucleotide = (props) => (
  <g
    className="nucleotide"
    title="click to start selection"
    transform={`translate(${props.x}, ${props.y})`}
  >
    <text x="5" y="43" fill="#333">{props.type}</text>

    <g
      className="position"
    >
      <rect
        className="background"
        x={-(props.position.toString().length - 1) * 10 / 2}
        y="0"
        width={props.position.toString().length * 10 + 10}
        height="25"
        rx="2"
        ry="2"
      />

      <rect
        className="border"
        x="0"
        y="20"
        width="20"
        height="30"
        rx="5"
        ry="5"
      />

      <text
        x={5 - ((props.position.toString().length - 1) * 10 / 2)}
        y="18"
      >
        {props.position}
      </text>

    </g>
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
