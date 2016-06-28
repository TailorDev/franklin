import React, { Component, PropTypes } from 'react';
import { getNucleotideCoordinates } from '../../utils/positionning';

const { bool, object, func, number, string } = PropTypes;

export default class Nucleotide extends Component {

  constructor(props, context) {
    super(props, context);

    this.state = { x: 0, y: 0 };
  }

  componentWillMount() {
    // First rendering
    this.updateCoordinates(this.props);
  }

  componentWillReceiveProps(nextProps) {
    // On resize, the number of nucleotides per row changes
    // this is the only case where we need to update coordinates
    if (
      (this.props.nucleotidesPerRow !== nextProps.nucleotidesPerRow) ||
      (this.props.rowHeight !== nextProps.rowHeight)
    ) {
      this.updateCoordinates(nextProps);
    }
  }

  shouldComponentUpdate(nextProps) {
    return (this.props.isSelected !== nextProps.isSelected) ||
      (this.props.isInSelectionRange !== nextProps.isInSelectionRange) ||
      (this.props.nucleotidesPerRow !== nextProps.nucleotidesPerRow) ||
      (this.props.rowHeight !== nextProps.rowHeight);
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
    this.setState(getNucleotideCoordinates(
      props.index,
      props.visualizerMargin,
      props.nucleotidesPerRow,
      props.nucleotideWidth,
      props.rowHeight
    ));
  }

  render() {
    return (
      <g
        className="nucleotide"
        title="click to start selection"
        transform={`translate(${this.state.x}, ${this.state.y})`}
        onClick={this.props.onClick}
      >
        <g className={`type${this.props.isInSelectionRange ? ' in-selection' : ''}`}>
          <text x="5" y="43">{this.props.type}</text>
        </g>

        <g className={`position${this.props.isSelected ? ' selected' : ''}`}>
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
  isSelected: bool.isRequired,
  isInSelectionRange: bool.isRequired,
  // attributes
  type: string.isRequired,
  position: number.isRequired,
  // events
  onClick: func.isRequired,
};
