import React, { Component, PropTypes } from 'react';

const { number, object, string } = PropTypes;


class Annotation extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      linesCoordinates: [], // [[x1, x2, y], [x1, x2, y], ...]
    };
  }

  componentWillMount() {
    // First rendering
    this.updateCoordinates();
  }

  componentWillReceiveProps() {
    this.updateCoordinates();
  }

  updateCoordinates() {
    const { indexFrom, indexTo, rowHeight, nucleotidesPerRow, nucleotideWidth } = this.props;

    // Prepare segments
    const segments = [];
    let start = indexFrom;
    for (let i = start; i < indexTo; i++) {
      if (! (i % nucleotidesPerRow)) {
        segments.push([start, i - 1]);
        start = i;
      }
    }
    segments.push([start, indexTo]);

    const linesCoordinates = segments.map((segment) => {
      const x1 = 15 + (nucleotideWidth * (segment[0] % nucleotidesPerRow));
      const x2 = 25 + (nucleotideWidth * (segment[1] % nucleotidesPerRow));
      const y = rowHeight + 10 + (rowHeight * Math.trunc(segment[0] / nucleotidesPerRow));
      return [x1, x2, y];
    });

    this.setState({ linesCoordinates });
  }

  render() {
    return (
      <g>
        {this.state.linesCoordinates.map((lineCoordinates, index) =>
          <line
            key={index}
            x1={lineCoordinates[0]}
            x2={lineCoordinates[1]}
            y1={lineCoordinates[2]}
            y2={lineCoordinates[2]}
            className="annotation"
            stroke={this.props.label.color}
          />
        )}
      </g>
    );
  }
}


Annotation.propTypes = {
  indexFrom: number.isRequired,
  indexTo: number.isRequired,
  positionFrom: number.isRequired,
  positionTo: number.isRequired,
  label: object.isRequired,
  comment: string,
  nucleotidesPerRow: number.isRequired,
  rowHeight: number.isRequired,
  nucleotideWidth: number.isRequired,
};

export default Annotation;
