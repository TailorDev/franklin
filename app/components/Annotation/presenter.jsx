import React, { Component, PropTypes } from 'react';

const { bool, func, number, object } = PropTypes;


const tickPosition = {
  x: 5,
  y: 4,
};

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
    const a = this.props.annotation;
    const isReverse = a.positionFrom > a.positionTo;
    const isUnit = a.positionFrom === a.positionTo;
    const indexForTick = isReverse ? 0 : this.state.segments.length - 1;

    return (
      <g
        className={`annotation
          ${this.props.label.isActive ? '' : 'inactive'}
          ${this.props.isSelected ? 'selected' : ''}`}
        onClick={this.props.onClick}
      >
        {this.state.segments.map((line, index) =>
          <g key={index}>
            <line
              x1={line.x1}
              x2={line.x2}
              y1={line.y1}
              y2={line.y2}
              className="annotation-segment"
              stroke={this.props.label.color}
            />
            {!isUnit && indexForTick === index ?
              <line
                x1={isReverse ? line.x1 : line.x2}
                x2={isReverse ? line.x1 + tickPosition.x : line.x2 - tickPosition.x}
                y1={isReverse ? line.y1 : line.y2}
                y2={isReverse ? line.y1 + tickPosition.y : line.y2 - tickPosition.y}
                stroke={this.props.label.color}
                className={`annotation-tick ${isReverse ? 'reverse' : 'forward'}`}
              /> : null
            }
          </g>
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
