import React, { Component, PropTypes } from 'react';
import { Events } from '../Store';

const { object, func, number, string } = PropTypes;

export default class Nucleotide extends Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      isSelected: false,
      isInSelectionRange: false,
    };
  }

  componentDidMount() {
    this.context.controller.on(Events.CHANGE_SELECTION, (selection) => {
      const isSelected = selection.includes(this.props.index);
      const isInSelectionRange = this.props.index <= selection.max() &&
        this.props.index >= selection.min();

      if (
        this.state.isSelected !== isSelected ||
        this.state.isInSelectionRange !== isInSelectionRange
      ) {
        this.setState({
          isSelected,
          isInSelectionRange,
        });
      }
    });
  }

  shouldComponentUpdate(nextProps, newState) {
    return (this.state.isSelected !== newState.isSelected) ||
      (this.state.isInSelectionRange !== newState.isInSelectionRange) ||
      (this.props.x !== nextProps.x) || (this.props.y !== nextProps.y);
  }

  getPositionLength() {
    return this.props.position.toString().length;
  }

  getPositionBackgroundXCoordinate() {
    return -(this.getPositionLength() - 1) * 10 / 2;
  }

  getPositionBackgroundWidth() {
    return this.getPositionLength() * 10 + 10;
  }

  getPositionTextXCoordinate() {
    return 5 - ((this.getPositionLength() - 1) * 10 / 2);
  }

  render() {
    return (
      <g
        className="nucleotide"
        title="click to start selection"
        transform={`translate(${this.props.x}, ${this.props.y})`}
        onClick={this.props.onClick}
      >
        <g className={`type${this.state.isInSelectionRange ? ' in-selection' : ''}`}>
          <text x="5" y="43">{this.props.type}</text>
        </g>

        <g className={`position${this.state.isSelected ? ' selected' : ''}`}>
          <rect
            className="position-background"
            x={this.getPositionBackgroundXCoordinate()}
            y="0"
            width={this.getPositionBackgroundWidth()}
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
            x={this.getPositionTextXCoordinate()}
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
  index: number.isRequired,
  // attributes
  type: string.isRequired,
  position: number.isRequired,
  // events
  onClick: func.isRequired,
};

Nucleotide.contextTypes = {
  controller: object.isRequired,
};
