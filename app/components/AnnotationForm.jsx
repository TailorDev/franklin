import React, { PropTypes, Component } from 'react';
import Immutable from 'immutable';
import { HotKeys } from 'react-hotkeys';
import { Events } from '../Store';

const { instanceOf, object } = PropTypes;

const emptyState = {
  annotationPositionFrom: undefined,
  annotationPositionTo: undefined,
  annotationComment: '',
  labelId: '',
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

  componentDidMount() {
    this.context.controller.on(Events.CHANGE_CURRENT_ANNOTATION, (state) => {
      this.setState({
        annotationPositionFrom: state.annotation.positionFrom,
        annotationPositionTo: state.annotation.positionTo,
        annotationComment: state.annotation.comment,
        labelId: state.labelId,
        annotationId: state.annotationId,
      });
    });
  }

  onSubmit(event) {
    event.preventDefault();

    this.context.controller.dispatch('action:save-annotation', {
      labelId: this.state.labelId,
      annotation: {
        positionFrom: this.state.annotationPositionFrom,
        positionTo: this.state.annotationPositionTo,
        comment: this.state.annotationComment,
      },
      annotationId: this.state.annotationId,
    });

    this.reset();

    this.context.controller.dispatch('action:clear-selection');
  }

  onPositionFromChange(event) {
    const positionFrom = event.target.value;

    this.setState({ annotationPositionFrom: positionFrom });

    this.context.controller.dispatch('action:update-selection-from', { positionFrom });
  }

  onPositionToChange(event) {
    const positionTo = event.target.value;

    this.setState({ annotationPositionTo: positionTo });

    this.context.controller.dispatch('action:update-selection-to', { positionTo });
  }

  onLabelChange(event) {
    this.setState({ labelId: event.target.value });
  }

  onCommentChange(event) {
    this.setState({ annotationComment: event.target.value });
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
              value={this.state.annotationPositionFrom}
              placeholder="From"
              onChange={this.onPositionFromChange}
            />
            <input
              type="number"
              value={this.state.annotationPositionTo}
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
              value={this.state.annotationComment}
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
};

AnnotationForm.contextTypes = {
  controller: object.isRequired,
};

export default AnnotationForm;
