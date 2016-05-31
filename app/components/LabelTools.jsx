import React, { PropTypes, Component } from 'react';

const { func } = PropTypes;


class LabelTools extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleActionActivateClick = this.handleActionActivateClick.bind(this);
    this.handleActionRemoveClick = this.handleActionRemoveClick.bind(this);
  }

  handleActionActivateClick() {
    this.props.onActionActivateClick();
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
          onClick={this.handleActionActivateClick}
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
  onActionActivateClick: func.isRequired,
  onActionRemoveClick: func.isRequired,
};

export default LabelTools;
