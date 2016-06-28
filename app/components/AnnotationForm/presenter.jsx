import React, { PropTypes, Component } from 'react';
import Immutable from 'immutable';
import { HotKeys } from 'react-hotkeys';

const { number, string, shape, func, instanceOf } = PropTypes;


const emptyState = {
  // form fields
  labelId: '',
  positionFrom: '',
  positionTo: '',
  comment: '',
  annotationId: null,
};

class AnnotationForm extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = emptyState;

    this.onSubmit = this.onSubmit.bind(this);
    this.onPositionFromChange = this.onPositionFromChange.bind(this);
    this.onPositionToChange = this.onPositionToChange.bind(this);
    this.onLabelChange = this.onLabelChange.bind(this);
    this.onCommentChange = this.onCommentChange.bind(this);
    this.reset = this.reset.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.current && null !== nextProps.current) {
      this.setState({
        labelId: nextProps.current.labelId,
        annotationId: nextProps.current.annotationId,
        positionFrom: nextProps.current.annotation.positionFrom,
        positionTo: nextProps.current.annotation.positionTo,
        comment: nextProps.current.annotation.comment,
      });

      return;
    }

    const selection = nextProps.selection;

    if (undefined === selection.from && undefined === selection.to) {
      this.reset();
    } else {
      this.setState(Object.assign({}, emptyState, {
        positionFrom: selection.from !== undefined ? selection.from + 1 : '',
        positionTo: selection.to !== undefined ? selection.to + 1 : '',
      }));
    }
  }

  onSubmit(event) {
    event.preventDefault();

    this.props.onSubmit(
      this.state.labelId,
      {
        positionFrom: this.state.positionFrom,
        positionTo: this.state.positionTo,
        comment: this.state.comment,
      },
      this.state.annotationId
    );

    this.reset();
  }

  onPositionFromChange(event) {
    const positionFrom = event.target.value;

    this.setState({ positionFrom });
    this.props.updateSelectionFrom(positionFrom);
  }

  onPositionToChange(event) {
    const positionTo = event.target.value;

    this.setState({ positionTo });
    this.props.updateSelectionTo(positionTo);
  }

  onLabelChange(event) {
    this.setState({ labelId: event.target.value });
  }

  onCommentChange(event) {
    this.setState({ comment: event.target.value });
  }

  reset() {
    this.setState(emptyState);
  }

  render() {
    const keyHandlers = {
      clearSelection: this.reset,
    };

    return (
      <HotKeys handlers={keyHandlers}>
        <div className="annotation-form">
          <form onSubmit={this.onSubmit}>
            <input
              type="number"
              value={this.state.positionFrom}
              placeholder="From"
              onChange={this.onPositionFromChange}
            />
            <input
              type="number"
              value={this.state.positionTo}
              placeholder="To"
              onChange={this.onPositionToChange}
            />
            <select
              onChange={this.onLabelChange}
              value={this.state.labelId}
            >
              <option>Select a label</option>
              {
                this.props.labels.map((label, index) =>
                  <option
                    key={index}
                    value={index}
                  >
                    {label.name}
                  </option>
                )
              }
            </select>
            <textarea
              placeholder="Type a comment here"
              value={this.state.comment}
              onChange={this.onCommentChange}
            />
            <input
              type="submit"
              value={null !== this.state.annotationId ? 'Save' : 'Add'}
            />
          </form>
        </div>
      </HotKeys>
    );
  }
}

AnnotationForm.propTypes = {
  sequence: instanceOf(Immutable.List).isRequired,
  labels: instanceOf(Immutable.List).isRequired,
  onSubmit: func.isRequired,
  updateSelectionFrom: func.isRequired,
  updateSelectionTo: func.isRequired,
  current: shape({
    labelId: number.isRequired,
    annotationId: number.isRequired,
    annotation: shape({
      positionFrom: number.isRequired,
      positionTo: number.isRequired,
      comment: string.isRequired,
    }),
  }),
};

export default AnnotationForm;
