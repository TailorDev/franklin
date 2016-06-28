import React, { Component, PropTypes } from 'react';

const { bool, func, number, object } = PropTypes;


class Annotation extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      segments: [], // [[x1, x2, y1, y2], [x1, x2, y1, y2], ...]
    };
  }

  componentWillMount() {
    // First rendering
    this.updateSegments(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.updateSegments(nextProps);
  }

  updateSegments(props) {
    this.setState({
      segments: props.getAnnotationSegments(
        props.annotation.positionFrom - 1,
        props.annotation.positionTo - 1
      ),
    });
  }

  render() {
    return (
      <g
        className={`annotation
          ${this.props.label.isActive ? null : 'inactive'}
          ${this.props.isSelected ? 'selected' : null}`}
        onClick={this.props.onClick}
      >
        {this.state.segments.map((line, index) =>
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
  getAnnotationSegments: func.isRequired,
  isSelected: bool.isRequired,
  onClick: func.isRequired,
};

export default Annotation;
