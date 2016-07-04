import React, { Component, PropTypes } from 'react';
import Line from './Line';

const { bool, func, number, object } = PropTypes;


class Annotation extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      segments: [], // [[x1, x2, y1, y2], [x1, x2, y1, y2], ...]
    };

    this.onClick = this.onClick.bind(this);
  }

  componentWillMount() {
    // First rendering
    this.updateSegments(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.updateSegments(nextProps);
  }

  onClick() {
    this.props.onClick(
      this.props.labelId,
      this.props.annotation,
      this.props.positionFrom
    );
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
    const a = this.props.annotation;
    const isReverse = a.positionFrom > a.positionTo;
    const isUnit = a.positionFrom === a.positionTo;
    const indexForTick = isReverse ? 0 : this.state.segments.length - 1;

    return (
      <g
        className={`annotation
          ${this.props.label.isActive ? '' : 'inactive'}
          ${this.props.isSelected ? 'selected' : ''}`
        }
        onClick={this.onClick}
      >
        {this.state.segments.map((line, index) =>
          <Line
            key={index}
            x1={line.x1}
            x2={line.x2}
            y1={line.y1}
            y2={line.y2}
            color={this.props.label.color}
            hasTick={!isUnit && indexForTick === index}
            isReverse={isReverse}
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
  positionFrom: number.isRequired,
};

export default Annotation;
