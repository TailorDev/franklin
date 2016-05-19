import React, { Component, PropTypes } from 'react';

const { bool, func, number, string } = PropTypes;

export default class Nucleotide extends Component {

  shouldComponentUpdate(nextProps) {
    return (this.props.isSelected !== nextProps.isSelected) ||
     (this.props.isInSelectionRange !== nextProps.isInSelectionRange);
  }

  render() {
    return (
      <g
        className="nucleotide"
        title="click to start selection"
        transform={`translate(${this.props.x}, ${this.props.y})`}
        onClick={this.props.onClick}
      >
        <g
          className={
            this.props.isInSelectionRange ? 'type in-selection' : 'type'
          }
        >
          <text x="5" y="43">{this.props.type}</text>
        </g>

        <g
          className={this.props.isSelected ? 'position selected' : 'position'}
        >
          <rect
            className="position-background"
            x={-(this.props.position.toString().length - 1) * 10 / 2}
            y="0"
            width={this.props.position.toString().length * 10 + 10}
            height="25"
            rx="2"
            ry="2"
          />

          <rect
            className="type-highlight"
            x="0"
            y="20"
            width="20"
            height="30"
            rx="5"
            ry="5"
          />

          <text
            x={5 - ((this.props.position.toString().length - 1) * 10 / 2)}
            y="18"
          >
            {this.props.position}
          </text>

        </g>
      </g>
    );
  }
}

Nucleotide.propTypes = {
  x: number.isRequired,
  y: number.isRequired,
  // attributes
  type: string.isRequired,
  position: number.isRequired,
  isSelected: bool.isRequired,
  isInSelectionRange: bool.isRequired,
  // events
  onClick: func.isRequired,
};
