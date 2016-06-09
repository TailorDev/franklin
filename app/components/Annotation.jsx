import React, { Component, PropTypes } from 'react';

const { func, number, object } = PropTypes;


class Annotation extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      lines: [], // [[x1, x2, y1, y2], [x1, x2, y1, y2], ...]
    };

    this.handleClick = this.handleClick.bind(this);
  }

  componentWillMount() {
    // First rendering
    this.updateCoordinates(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.updateCoordinates(nextProps);
  }

  updateCoordinates(props) {
    const indexFrom = props.annotation.positionFrom - 1;
    const indexTo = props.annotation.positionTo - 1;

    // Prepare segments
    const segments = [];
    let start = indexFrom;
    for (let i = start + 1; i < indexTo; i++) {
      if (! (i % props.nucleotidesPerRow)) {
        segments.push([start, i - 1]);
        start = i;
      }
    }
    segments.push([start, indexTo]);

    const lines = segments.map((segment) =>
      props.getAnnotationSegmentCoordinates(
        segment[0],
        segment[1]
      )
    );

    this.setState({ lines });
  }

  handleClick() {
    this.context.controller.dispatch('action:select-annotation', {
      labelId: this.props.labelId,
      annotation: this.props.annotation,
    });
  }

  render() {
    return (
      <g
        className={`annotation
          ${this.props.label.isActive ? null : 'inactive'}
          ${this.props.annotation.isSelected ? 'selected' : null}`}
        onClick={this.handleClick}
      >
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
  annotation: object.isRequired,
  label: object.isRequired,
  labelId: number.isRequired,
  getAnnotationSegmentCoordinates: func.isRequired,
  nucleotidesPerRow: number.isRequired,
};

Annotation.contextTypes = {
  controller: object.isRequired,
};

export default Annotation;
