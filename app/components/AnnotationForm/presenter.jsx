import React, { PropTypes, Component } from 'react';
import Immutable from 'immutable';
import { HotKeys } from 'react-hotkeys';
import Remove from './Remove';

const { array, number, string, shape, func, instanceOf } = PropTypes;


const emptyState = {
  // form fields
  labelId: '',
  positionFrom: '',
  positionTo: '',
  comment: '',
  annotationId: null,
  // UI state
  displayRemoveForm: false,
  disablePositions: false,
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
    this.toggleActionRemove = this.toggleActionRemove.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.current && null !== nextProps.current) {
      this.setState({
        labelId: nextProps.current.labelId,
        annotationId: nextProps.current.annotationId,
        comment: nextProps.current.annotation.comment,
      });
    }

    const selections = nextProps.selections;

    if (0 === selections.length) {
      this.reset();
    } else if (1 === selections.length) {
      const selection = selections[0];

      if (undefined !== selection.from) {
        this.setState({
          disablePositions: false,
          positionFrom: selection.from + 1,
        });
      }

      if (undefined !== selection.to) {
        this.setState({
          disablePositions: false,
          positionTo: selection.to + 1,
        });
      }
    } else {
      this.setState({
        disablePositions: true,
        positionFrom: '',
        positionTo: '',
      });
    }
  }

  onSubmit(event) {
    event.preventDefault();

    this.props.selections.forEach((s) => {
      this.props.onSubmit(
        this.state.labelId,
        {
          positionFrom: s.from,
          positionTo: s.to,
          comment: this.state.comment,
        },
        this.state.annotationId
      );
    });

    this.reset();
    this.props.onSubmitDone();
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

  toggleActionRemove() {
    this.setState({
      displayRemoveForm: !this.state.displayRemoveForm,
    });
  }

  handleRemove() {
    this.props.onRemove(this.state.labelId, this.state.annotationId);
    this.reset();
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
              disabled={this.state.disablePositions}
            />
            <input
              type="number"
              value={this.state.positionTo}
              placeholder="To"
              onChange={this.onPositionToChange}
              disabled={this.state.disablePositions}
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
            {null !== this.state.annotationId ?
              <i
                className="fa fa-trash remove"
                onClick={this.toggleActionRemove}
              ></i> : null
            }
          </form>

          {this.state.displayRemoveForm ?
            <Remove
              onRemove={this.handleRemove}
              onActionRemoveCancelClick={this.toggleActionRemove}
            /> : null
          }
        </div>
      </HotKeys>
    );
  }
}

AnnotationForm.propTypes = {
  sequence: instanceOf(Immutable.List).isRequired,
  labels: instanceOf(Immutable.List).isRequired,
  onSubmit: func.isRequired,
  onSubmitDone: func.isRequired,
  onRemove: func.isRequired,
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
  selections: array.isRequired,
};

export default AnnotationForm;
