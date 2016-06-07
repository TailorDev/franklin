import React, { PropTypes, Component } from 'react';
import Immutable from 'immutable';

const { instanceOf, object } = PropTypes;

const emptyState = {
  positionFrom: undefined,
  positionTo: undefined,
  comment: '',
  label: null,
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
  }

  onSubmit(event) {
    event.preventDefault();

    this.context.controller.dispatch('action:new-annotation', {
      label: this.state.label,
      annotation: {
        positionFrom: parseInt(this.state.positionFrom, 10),
        positionTo: parseInt(this.state.positionTo, 10),
        comment: this.state.comment,
      },
    });

    this.setState(emptyState);
    this.context.controller.dispatch('action:clear-selection');
  }

  onPositionFromChange(event) {
    const positionFrom = event.target.value;
    this.setState({ positionFrom });
    this.context.controller.dispatch('action:update-selection-from', { positionFrom });
  }

  onPositionToChange(event) {
    const positionTo = event.target.value;
    this.setState({ positionTo });
    this.context.controller.dispatch('action:update-selection-to', { positionTo });
  }

  onLabelChange(event) {
    this.setState({ label: this.props.labels.get(event.target.value) });
  }

  onCommentChange(event) {
    this.setState({ comment: event.target.value });
  }

  render() {
    return (
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
            value={this.props.labels.indexOf(this.state.label)}
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
            value="Add"
          />
        </form>
      </div>
    );
  }
}

AnnotationForm.propTypes = {
  annotation: object,
  sequence: instanceOf(Immutable.List).isRequired,
  labels: instanceOf(Immutable.List).isRequired,
};

AnnotationForm.contextTypes = {
  controller: object.isRequired,
};

export default AnnotationForm;
