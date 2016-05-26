import React, { PropTypes, Component } from 'react';

import Label from './Label';
import { SwatchesPicker } from 'react-color';

const { object, func } = PropTypes;


const defaultLabel = {
  name: '',
  color: '#ccc',
};

export default class Labels extends Component {
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
    this.setState((previousState) => {
      return {
        newLabel: {
          name: previousState.newLabel.name,
          color: color.hex,
        },
        displayColorPicker: false,
      };
    });
  }

  handleNameChange(event) {
    event.persist();

    this.setState((previousState) => {
      return {
        newLabel: {
          name: event.target.value,
          color: previousState.newLabel.color,
        },
      };
    });
  }

  handleSubmit() {
    this.props.onCreateNewLabel(this.state.newLabel);
    this.setState({ newLabel: defaultLabel });
  }

  render() {
    return (
      <ul className="annotations">
        {this.props.labels.map((label, index) =>
          <Label
            name={label.name}
            color={label.color}
            key={index}
          />
        )}

        <li className="annotation new">
          <input
            type="text"
            value={this.state.newLabel.name}
            onChange={this.handleNameChange}
          />

          <div
            className="colorpicker-button"
            onClick={this.handleColorpickerClick}
            style={{ background: this.state.newLabel.color }}
          />

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

          <input
            type="submit"
            value="Add label"
            className="button"
            onClick={this.handleSubmit}
          />
        </li>
      </ul>
    );
  }
}

Labels.propTypes = {
  labels: object.isRequired,
  onCreateNewLabel: func.isRequired,
};
