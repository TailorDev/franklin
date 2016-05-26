import React, { PropTypes, Component } from 'react';
import Immutable from 'immutable';

import Label from './Label';
import { SwatchesPicker } from 'react-color';

const { instanceOf, func } = PropTypes;


const defaultLabel = {
  name: '',
  color: '#f6f6f6',
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
    this.setState((previousState) => ({
      newLabel: {
        name: previousState.newLabel.name,
        color: color.hex,
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
      },
    }));
  }

  handleSubmit(event) {
    if (event) {
      // Prevent page reload
      event.preventDefault();
    }
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
              placeholder="Tag name"
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
        </li>
      </ul>
    );
  }
}

Labels.propTypes = {
  labels: instanceOf(Immutable.List).isRequired,
  onCreateNewLabel: func.isRequired,
};
