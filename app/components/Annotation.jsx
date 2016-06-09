import React, { Component, PropTypes } from 'react';
import { Events } from '../Store';

const { func, number, object } = PropTypes;


class Annotation extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      segments: [], // [[x1, x2, y1, y2], [x1, x2, y1, y2], ...]
      isSelected: false,
    };

    this.handleClick = this.handleClick.bind(this);
  }

  componentWillMount() {
    // First rendering
    this.updateCoordinates(this.props);
  }

  componentDidMount() {
    this.context.controller.on(Events.CHANGE_CURRENT_ANNOTATION, (state) => {
      this.setState({
        isSelected: this.props.annotation === state.annotation,
      });
    });

    this.context.controller.on(Events.CHANGE_SELECTION, () => {
      this.setState({ isSelected: false });
    });
  }

  componentWillReceiveProps(nextProps) {
    this.updateCoordinates(nextProps);
  }

  updateCoordinates(props) {
    this.setState({
      segments: props.getAnnotationSegments(
        props.annotation.positionFrom - 1,
        props.annotation.positionTo - 1
      ),
    });
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
          ${this.state.isSelected ? 'selected' : null}`}
        onClick={this.handleClick}
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
};

Annotation.contextTypes = {
  controller: object.isRequired,
};

export default Annotation;
