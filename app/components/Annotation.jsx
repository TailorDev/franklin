import React, { Component, PropTypes } from 'react';
import Immutable from 'immutable';

import { getAnnotationSegmentCoordinates } from '../utils/positionning';

const { instanceOf, number, object, string } = PropTypes;


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
    const { indexFrom, indexTo, nucleotidesPerRow } = props;

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

    // Get track number
    const track = props.labels.indexOf(props.label);

    const lines = segments.map((segment) =>
      getAnnotationSegmentCoordinates(
        segment[0],
        segment[1],
        track,
        props
      )
    );

    this.setState({ lines });
  }

  render() {
    return (
      <g>
        {this.state.lines.map((line, index) =>
          <line
            key={index}
            x1={line.x1}
            x2={line.x2}
            y1={line.y1}
            y2={line.y2}
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
  labels: instanceOf(Immutable.List).isRequired,
  label: object.isRequired,
  comment: string,
  visualizerMargin: object.isRequired,
  nucleotidesPerRow: number.isRequired,
  nucleotidesRowHeight: number.isRequired,
  nucleotideWidth: number.isRequired,
  trackHeight: number.isRequired,
  rowHeight: number.isRequired,
};

Annotation.contextTypes = {
  controller: object.isRequired,
};

export default Annotation;
