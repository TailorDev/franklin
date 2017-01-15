import React, { PropTypes, Component } from 'react';
import Immutable from 'immutable';

import Label from './Label';
import LabelForm from './LabelForm';

const { func, instanceOf } = PropTypes;


export default class Labels extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = { displayNewLabelForm: false };

    this.onCreateNewLabel = this.onCreateNewLabel.bind(this);
    this.toggleNewLabelForm = this.toggleNewLabelForm.bind(this);
  }

  onCreateNewLabel(label) {
    this.props.onCreateNewLabel(label);
    this.toggleNewLabelForm();
  }

  toggleNewLabelForm() {
    this.setState({
      displayNewLabelForm: !this.state.displayNewLabelForm,
    });
  }

  render() {
    return (
      <ul className="labels">
        {this.props.labels.map((label, index) =>
          <Label
            key={index}
            label={label}
            onToggleLabel={() => { this.props.onToggleLabel(index); }}
            onEditLabel={(editedLabel) => { this.props.onEditLabel(index, editedLabel); }}
            onRemoveLabel={() => { this.props.onRemoveLabel(index); }}
          />,
        )}

        <li className="new">
          {this.state.displayNewLabelForm ?
            <LabelForm
              onCreateNewLabel={this.onCreateNewLabel}
              onCancel={this.toggleNewLabelForm}
            />
            :
            <button
              className="button new-label"
              onClick={this.toggleNewLabelForm}
            >
                New label
              </button>
          }
        </li>
      </ul>
    );
  }
}

Labels.propTypes = {
  labels: instanceOf(Immutable.List).isRequired,
  onToggleLabel: func.isRequired,
  onEditLabel: func.isRequired,
  onRemoveLabel: func.isRequired,
  onCreateNewLabel: func.isRequired,
};
