import React, { PropTypes, Component } from 'react';

const { func } = PropTypes;


class LabelTools extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleActionToggleClick = this.handleActionToggleClick.bind(this);
    this.handleActionEditClick = this.handleActionEditClick.bind(this);
    this.handleActionRemoveClick = this.handleActionRemoveClick.bind(this);
  }

  handleActionToggleClick() {
    this.props.onActionToggleClick();
  }

  handleActionEditClick() {
    this.props.onActionEditClick();
  }

  handleActionRemoveClick() {
    this.props.onActionRemoveClick();
  }

  render() {
    return (
      <span className="label-tools">
        <i
          className="fa fa-adjust toggle"
          aria-hidden="true"
          title="Toggle active"
          onClick={this.handleActionToggleClick}
        />
        <i
          className="fa fa-pencil edit"
          aria-hidden="true"
          title="Edit"
          onClick={this.handleActionEditClick}
        />
        <i
          className="fa fa-trash-o remove"
          aria-hidden="true"
          title="Remove"
          onClick={this.handleActionRemoveClick}
        />
      </span>
    );
  }
}

LabelTools.propTypes = {
  onActionToggleClick: func.isRequired,
  onActionEditClick: func.isRequired,
  onActionRemoveClick: func.isRequired,
};

export default LabelTools;
