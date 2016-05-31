import React, { PropTypes, Component } from 'react';

const { string } = PropTypes;

import LabelTools from './LabelTools';
import LabelRemove from './LabelRemove';


class Label extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      displayRemoveForm: false,
    };

    this.toggleActionRemove = this.toggleActionRemove.bind(this);
  }

  toggleActionRemove() {
    this.setState({
      displayRemoveForm: !this.state.displayRemoveForm,
    });
  }

  render() {
    return (
      <li className={`annotation ${this.state.displayRemoveForm ? 'in-action remove' : ''}`}>
        <span className="label-name">
          <i className="fa fa-tag" aria-hidden="true" style={{ color: this.props.color }}></i>
          {this.props.name}
        </span>

        <LabelTools
          onActionRemoveClick={this.toggleActionRemove}
        />

        {this.state.displayRemoveForm ?
          <LabelRemove
            onActionRemoveCancelClick={this.toggleActionRemove}
          /> : null
        }
      </li>
    );
  }
}

Label.propTypes = {
  name: string.isRequired,
  color: string.isRequired,
};

export default Label;
