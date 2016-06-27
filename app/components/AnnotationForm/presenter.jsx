import React, { PropTypes, Component } from 'react';
import Immutable from 'immutable';
import { HotKeys } from 'react-hotkeys';
import { emptySelection } from '../../defaults';

const { func, instanceOf } = PropTypes;


const emptyState = {
  annotationPositionFrom: '',
  annotationPositionTo: '',
  annotationComment: '',
  labelId: '',
  annotationId: null,
};

class AnnotationForm extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = emptyState;

    this.onSubmit = this.onSubmit.bind(this);
    this.onSelectionChange = this.onSelectionChange.bind(this);
    this.onPositionFromChange = this.onPositionFromChange.bind(this);
    this.onPositionToChange = this.onPositionToChange.bind(this);
    this.onLabelChange = this.onLabelChange.bind(this);
    this.onCommentChange = this.onCommentChange.bind(this);
    this.reset = this.reset.bind(this);
  }

  componentDidMount() {
    // TODO: fixme
    /*
    this.context.controller.on(Events.CHANGE_CURRENT_ANNOTATION, (state) => {
      this.setState({
        annotationPositionFrom: state.annotation.positionFrom,
        annotationPositionTo: state.annotation.positionTo,
        annotationComment: state.annotation.comment,
        labelId: state.labelId,
        annotationId: state.annotationId,
      });
    });

    this.context.controller.on(Events.CHANGE_SELECTION, (selection) => {
      this.onSelectionChange(selection);
    });
    */
  }

  onSubmit(event) {
    event.preventDefault();

    this.props.onSubmit(
      this.state.labelId,
      {
        positionFrom: this.state.annotationPositionFrom,
        positionTo: this.state.annotationPositionTo,
        comment: this.state.annotationComment,
      },
      this.state.annotationId
    );
  }

  onSelectionChange(selection) {
    if (selection === emptySelection || null !== this.state.annotationId) {
      this.reset();
    }

    this.setState({
      annotationPositionFrom: selection.from !== undefined ? selection.from + 1 : '',
      annotationPositionTo: selection.to !== undefined ? selection.to + 1 : '',
    });
  }

  onPositionFromChange(event) {
    const positionFrom = event.target.value;

    this.setState({ annotationPositionFrom: positionFrom });
    this.props.updateSelectionFrom(positionFrom);
  }

  onPositionToChange(event) {
    const positionTo = event.target.value;

    this.setState({ annotationPositionTo: positionTo });
    this.props.updateSelectionTo(positionTo);
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
  onSubmit: func.isRequired,
  updateSelectionFrom: func.isRequired,
  updateSelectionTo: func.isRequired,
};

export default AnnotationForm;
