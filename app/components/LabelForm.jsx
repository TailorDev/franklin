import React, { PropTypes, Component } from 'react';

import { SwatchesPicker } from 'react-color';

const { func } = PropTypes;
const defaultLabel = {
  name: '',
  color: '#f6f6f6',
  isActive: true,
};


class LabelForm extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      displayColorPicker: false,
      newLabel: defaultLabel,
    };

    this.handleColorpickerClick = this.handleColorpickerClick.bind(this);
    this.handleColorpickerClose = this.handleColorpickerClose.bind(this);
    this.handleColorChange = this.handleColorChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
      newLabel: {
        name: previousState.newLabel.name,
        color: color.hex,
        isActive: true,
      },
      displayColorPicker: false,
    }));
  }

  handleNameChange(event) {
    event.persist();

    this.setState((previousState) => ({
      newLabel: {
        name: event.target.value,
        color: previousState.newLabel.color,
        isActive: true,
      },
    }));
  }

  handleSubmit(event) {
    if (event) {
      // Prevent page reload
      event.preventDefault();
    }

    // Prevent empty label name
    if (!this.state.newLabel.name.length) {
      return;
    }

    this.props.onCreateNewLabel(this.state.newLabel);
    this.setState({ newLabel: defaultLabel });
  }

  render() {
    return (
      <div className="label-form">
        <form className="input-group">
          <span
            className="input-group-label colorpicker-button"
            onClick={this.handleColorpickerClick}
            style={{ background: this.state.newLabel.color }}
          >
            <i className="fa fa-eyedropper" aria-hidden="true"></i>
          </span>

          <input
            type="text"
            value={this.state.newLabel.name}
            placeholder="Label name"
            className="input-group-field"
            onChange={this.handleNameChange}
          />

          <div className="input-group-button">
            <input
              type="submit"
              value="Add"
              className="button"
              onClick={this.handleSubmit}
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
              color={this.state.newLabel.color}
              onChange={this.handleColorChange}
            />
          </div> : null
        }
      </div>
    );
  }
}

LabelForm.propTypes = {
  onCreateNewLabel: func.isRequired,
};

export default LabelForm;
