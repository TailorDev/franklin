import React, { PropTypes, Component } from 'react';
import Immutable from 'immutable';

import { SwatchesPicker } from 'react-color';

const { func, object } = PropTypes;


const defaultLabel = {
  name: '',
  color: '#0F157B',
  isActive: true,
  annotations: new Immutable.List(),
};

class LabelForm extends Component {
  constructor(props, context) {
    super(props, context);

    let label = defaultLabel;
    if (this.props.label) {
      label = this.props.label;
    }

    this.state = {
      displayColorPicker: false,
      label,
    };

    this.handleColorpickerClick = this.handleColorpickerClick.bind(this);
    this.handleColorpickerClose = this.handleColorpickerClose.bind(this);
    this.handleColorChange = this.handleColorChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  handleColorpickerClick() {
    this.setState({
      displayColorPicker: !this.state.displayColorPicker,
    });
  }

  handleColorpickerClose() {
    this.setState({
      displayColorPicker: false,
    });
  }

  handleColorChange(color) {
    this.setState((previousState) => ({
      label: {
        name: previousState.label.name,
        color: color.hex,
        isActive: true,
        annotations: previousState.label.annotations,
      },
      displayColorPicker: false,
    }));
  }

  handleNameChange(event) {
    event.persist();

    this.setState((previousState) => ({
      label: {
        name: event.target.value,
        color: previousState.label.color,
        isActive: true,
        annotations: previousState.label.annotations,
      },
    }));
  }

  handleSubmit(event) {
    if (event) {
      // Prevent page reload
      event.preventDefault();
    }

    // Prevent empty label name
    if (!this.state.label.name.length) {
      return;
    }

    if (this.props.onCreateNewLabel) {
      this.props.onCreateNewLabel(this.state.label);
    } else {
      this.props.onEditLabel(this.state.label);
    }

    this.setState({ label: defaultLabel });
  }

  handleCancel() {
    this.props.onCancel();
  }

  render() {
    return (
      <div className="label-form-wrapper">
        <form className="label-form">
          <div className="input-group">
            <span
              className="input-group-label colorpicker-button"
              onClick={this.handleColorpickerClick}
              style={{ background: this.state.label.color }}
            >
              <i className="fa fa-eyedropper" aria-hidden="true" />
            </span>

            <input
              type="text"
              value={this.state.label.name}
              placeholder="Label name"
              className="input-group-field"
              onChange={this.handleNameChange}
            />
          </div>

          <div className="action-buttons">
            <input
              type="submit"
              value={this.props.onCreateNewLabel ? 'Add' : 'Save'}
              className="button submit"
              onClick={this.handleSubmit}
            />
            <input
              type="reset"
              value="Cancel"
              className="button cancel"
              onClick={this.handleCancel}
            />
          </div>
        </form>

        {this.state.displayColorPicker ?
          <div className="colorpicker-panel">
            <div
              className="colorpicker-overlay"
              onClick={this.handleColorpickerClose}
            />
            <SwatchesPicker
              color={this.state.label.color}
              onChange={this.handleColorChange}
            />
          </div> : null
        }
      </div>
    );
  }
}

LabelForm.propTypes = {
  onCreateNewLabel: func,
  onEditLabel: func,
  onCancel: func.isRequired,
  label: object,
};

export default LabelForm;
