import React, { PropTypes, Component } from 'react';

const { func } = PropTypes;


class LabelTools extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleActionToggleClick = this.handleActionToggleClick.bind(this);
    this.handleActionRemoveClick = this.handleActionRemoveClick.bind(this);
  }

  handleActionToggleClick() {
    this.props.onActionToggleClick();
  }

  handleActionRemoveClick() {
    this.props.onActionRemoveClick();
  }

  render() {
    return (
      <span className="label-tools">
        <i
          className="fa fa-adjust"
          aria-hidden="true"
          title="Toggle active"
          onClick={this.handleActionToggleClick}
        />
        <i
          className="fa fa-pencil"
          aria-hidden="true"
          title="Edit"
        />
        <i
          className="fa fa-trash-o"
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
  onActionRemoveClick: func.isRequired,
};

export default LabelTools;
