import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Immutable from 'immutable';
import Remove from '../Remove';
import InputNumber from '../InputNumber';
import InputNumberWithInlineButton from '../InputNumber/InlineButton';

const { array, bool, number, string, shape, func, instanceOf } = PropTypes;


const emptyState = {
  // form fields
  labelId: '',
  positionFrom: '',
  positionTo: '',
  comment: '',
  displayTick: true,
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
    this.onDisplayTickChange = this.onDisplayTickChange.bind(this);
    this.reset = this.reset.bind(this);
    this.toggleActionRemove = this.toggleActionRemove.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.onSwitchPositions = this.onSwitchPositions.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.current && null !== nextProps.current) {
      this.setState({
        labelId: nextProps.current.labelId,
        annotationId: nextProps.current.annotationId,
        comment: nextProps.current.annotation.comment,
        displayTick: nextProps.current.annotation.displayTick,
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
          positionFrom: selection.from + nextProps.positionFrom,
        });
      }

      if (undefined !== selection.to) {
        this.setState({
          disablePositions: false,
          positionTo: selection.to + nextProps.positionFrom,
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
          positionFrom: s.from + this.props.positionFrom,
          positionTo: s.to + this.props.positionFrom,
          comment: this.state.comment,
          displayTick: this.state.displayTick,
        },
        this.state.annotationId,
      );
    });

    this.reset();
    this.props.onSubmitDone();
  }

  onPositionFromChange(event) {
    let positionFrom = parseInt(event.target.value, 10);

    if (isNaN(positionFrom)) {
      positionFrom = this.props.positionFrom;
    }

    this.props.updateSelectionFrom(positionFrom - this.props.positionFrom);
  }

  onPositionToChange(event) {
    let positionTo = parseInt(event.target.value, 10);

    if (isNaN(positionTo)) {
      positionTo = this.props.positionFrom;
    }

    this.props.updateSelectionTo(positionTo - this.props.positionFrom);
  }

  onSwitchPositions(event) {
    event.preventDefault();

    this.props.updateSelectionFrom(
      this.state.positionTo - this.props.positionFrom,
    );
    this.props.updateSelectionTo(
      this.state.positionFrom - this.props.positionFrom,
    );
  }

  onLabelChange(event) {
    this.setState({ labelId: event.target.value });
  }

  onCommentChange(event) {
    this.setState({ comment: event.target.value });
  }

  onDisplayTickChange() {
    this.setState({ displayTick: !this.state.displayTick });
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
    return (
      <div className="annotation-form">
        <form onSubmit={this.onSubmit}>
          <InputNumberWithInlineButton
            value={this.state.positionFrom}
            min={this.props.positionFrom}
            placeholder={'From'}
            onChange={this.onPositionFromChange}
            isDisabled={this.state.disablePositions}
            className="input-group-field"
            onClick={this.onSwitchPositions}
            titleText="Invert positions"
            hasButtonDisabled={this.state.positionFrom === this.state.positionTo}
          >
            <i className="fa fa-arrows-v" aria-hidden="true" />
          </InputNumberWithInlineButton>

          <InputNumber
            value={this.state.positionTo}
            min={this.props.positionFrom}
            placeholder={'To'}
            onChange={this.onPositionToChange}
            isDisabled={this.state.disablePositions}
          />
          <select
            onChange={this.onLabelChange}
            value={this.state.labelId}
          >
            <option>Select a label</option>
            {
              this.props.labels.map((label, index) =>
                <option
                  key={label.name}
                  value={index}
                >
                  {label.name}
                </option>,
              )
            }
          </select>
          <textarea
            placeholder="Type a comment here"
            value={this.state.comment}
            onChange={this.onCommentChange}
          />

          <label htmlFor="display-tick">
            Display orientation tick?&nbsp;
            <input
              type="checkbox"
              id="display-tick"
              checked={this.state.displayTick}
              onChange={this.onDisplayTickChange}
            />
          </label>

          <input
            type="submit"
            value={null !== this.state.annotationId ? 'Save' : 'Add'}
          />
          {null !== this.state.annotationId ?
            <button
              className="remove"
              onClick={this.toggleActionRemove}
            >
              <i className="fa fa-trash" />
            </button> : null
          }
        </form>

        {this.state.displayRemoveForm ?
          <Remove
            onRemove={this.handleRemove}
            onCancel={this.toggleActionRemove}
          >
            Are you sure you want to remove this annotation?
          </Remove> : null
        }
      </div>
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
      displayTick: bool.isRequired,
    }),
  }),
  selections: array.isRequired,
  positionFrom: number.isRequired,
};

AnnotationForm.defaultProps = {
  current: null,
};

export default AnnotationForm;
