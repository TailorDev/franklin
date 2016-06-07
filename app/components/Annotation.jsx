import React, { Component, PropTypes } from 'react';

import { getAnnotationSegmentCoordinates } from '../utils/positionning';

const { number, object, string } = PropTypes;


class Annotation extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      lines: [], // [[x1, x2, y1, y2], [x1, x2, y1, y2], ...]
    };
  }

  componentWillMount() {
    // First rendering
    this.updateCoordinates(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.updateCoordinates(nextProps);
  }

  updateCoordinates(props) {
    const { positionFrom, positionTo, nucleotidesPerRow } = props;

    const indexFrom = positionFrom - 1;
    const indexTo = positionTo - 1;

    // Prepare segments
    const segments = [];
    let start = indexFrom;
    for (let i = start + 1; i < indexTo; i++) {
      if (! (i % nucleotidesPerRow)) {
        segments.push([start, i - 1]);
        start = i;
      }
    }
    segments.push([start, indexTo]);

    const lines = segments.map((segment) =>
      getAnnotationSegmentCoordinates(
        segment[0],
        segment[1],
        props.track,
        props
      )
    );

    this.setState({ lines });
  }

  render() {
    return (
      <g className="annotation">
        {this.state.lines.map((line, index) =>
          <line
            key={index}
            x1={line.x1}
            x2={line.x2}
            y1={line.y1}
            y2={line.y2}
            className="annotation-segment"
            stroke={this.props.label.color}
          />
        )}
      </g>
    );
  }
}


Annotation.propTypes = {
  positionFrom: number.isRequired,
  positionTo: number.isRequired,
  label: object.isRequired,
  track: number.isRequired,
  comment: string,
  visualizerMargin: object.isRequired,
  nucleotidesPerRow: number.isRequired,
  nucleotidesRowHeight: number.isRequired,
  nucleotideWidth: number.isRequired,
  trackHeight: number.isRequired,
  rowHeight: number.isRequired,
};


export default Annotation;
