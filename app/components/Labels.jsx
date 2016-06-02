import React, { PropTypes, Component } from 'react';
import Immutable from 'immutable';

import Label from './Label';
import LabelForm from './LabelForm';

const { object, instanceOf } = PropTypes;


export default class Labels extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      displayNewLabelForm: false,
    };

    this.toggleNewLabelForm = this.toggleNewLabelForm.bind(this);
    this.onToggleLabel = this.onToggleLabel.bind(this);
    this.onRemoveLabel = this.onRemoveLabel.bind(this);
    this.onCreateNewLabel = this.onCreateNewLabel.bind(this);
  }

  onToggleLabel(index) {
    this.context.controller.dispatch('action:toggle-label', {
      index,
    });
  }

  onEditLabel(index, label) {
    this.context.controller.dispatch('action:edit-label', {
      index,
      label,
    });
  }

  onRemoveLabel(index) {
    this.context.controller.dispatch('action:remove-label', {
      index,
    });
  }

  onCreateNewLabel(label) {
    this.context.controller.dispatch('action:new-label', {
      label,
    });

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
            name={label.name}
            color={label.color}
            isActive={label.isActive}
            onToggleLabel={() => { this.onToggleLabel(index); }}
            onEditLabel={(editedLabel) => { this.onEditLabel(index, editedLabel); }}
            onRemoveLabel={() => { this.onRemoveLabel(index); }}
          />
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
};

Labels.contextTypes = {
  controller: object.isRequired,
};
