import React, { Component, PropTypes } from 'react';
import { Events } from '../Store';
import { getNucleotideCoordinates } from '../utils/positionning';

const { object, func, number, string } = PropTypes;

export default class Nucleotide extends Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      x: 0,
      y: 0,
      isSelected: false,
      isInSelectionRange: false,
    };
  }

  componentWillMount() {
    // First rendering
    this.updateCoordinates(this.props);
  }

  componentDidMount() {
    this.context.controller.on(Events.CHANGE_SELECTION, (selection) => {
      const isSelected = selection.from === this.props.index || selection.to === this.props.index;
      const isInSelectionRange = (
        selection.from <= this.props.index &&
        selection.to >= this.props.index
      );

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

  componentWillReceiveProps(nextProps) {
    // On resize, the number of nucleotides per row changes
    // this is the only case where we need to update coordinates
    if (this.props.nucleotidesPerRow !== nextProps.nucleotidesPerRow) {
      this.updateCoordinates(nextProps);
    }
  }

  shouldComponentUpdate(nextProps, newState) {
    return (this.state.isSelected !== newState.isSelected) ||
      (this.state.isInSelectionRange !== newState.isInSelectionRange) ||
      (this.props.nucleotidesPerRow !== nextProps.nucleotidesPerRow);
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

  updateCoordinates(props) {
    this.setState(
      getNucleotideCoordinates(props.index, props)
    );
  }

  render() {
    return (
      <g
        className="nucleotide"
        title="click to start selection"
        transform={`translate(${this.state.x}, ${this.state.y})`}
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
  visualizerMargin: object.isRequired,
  nucleotidesPerRow: number.isRequired,
  rowHeight: number.isRequired,
  nucleotideWidth: number.isRequired,
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
