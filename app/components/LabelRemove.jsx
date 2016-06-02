import React, { PropTypes, Component } from 'react';

const { func } = PropTypes;


class LabelRemove extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleActionRemoveCancelClick = this.handleActionRemoveCancelClick.bind(this);
    this.handleRemoveClick = this.handleRemoveClick.bind(this);
  }

  handleActionRemoveCancelClick() {
    this.props.onActionRemoveCancelClick();
  }

  handleRemoveClick() {
    this.props.onLabelRemove();
  }

  render() {
    return (
      <div className="action-remove">
        <p>
          Are you sure you want to remove this label and related annotations?
        </p>
        <div className="action-buttons">
          <button
            className="remove"
            onClick={this.handleRemoveClick}
          >
            Remove
          </button>
          <button
            className="cancel"
            onClick={this.handleActionRemoveCancelClick}
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }
}

LabelRemove.propTypes = {
  onActionRemoveCancelClick: func.isRequired,
  onLabelRemove: func.isRequired,
};

export default LabelRemove;
