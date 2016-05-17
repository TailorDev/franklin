import React from 'react';

import Label from './Label';
import { SwatchesPicker } from 'react-color';


const testLabels = [
  {
    name: 'Poke',
    color: '#aaa',
  },
  {
    name: 'Lambda',
    color: '#ddd',
  },
  {
    name: 'Primer',
    color: '#f00',
  },
  {
    name: 'SNP',
    color: '#f0f',
  },
  {
    name: 'Lambda',
    color: '#ccc',
  },
  {
    name: 'Second',
    color: '#00f',
  },
];

export default class Labels extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      labels: testLabels,
      displayColorPicker: false,
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleClick() {
    this.setState({
      displayColorPicker: !this.state.displayColorPicker,
    });
  }

  handleClose() {
    this.setState({
      displayColorPicker: false,
    });
  }

  render() {
    const popover = {
      position: 'absolute',
      zIndex: '2',
    };

    const cover = {
      position: 'fixed',
      top: '0',
      right: '0',
      bottom: '0',
      left: '0',
    };

    return (
      <ul className="annotations">
        {this.state.labels.map((label) =>
          <Label name={label.name} color={label.color} />
        )}

        <li className="annotation new">
          <input type="text" placeholder="New" />

          <button onClick={this.handleClick}>Pick Color</button>
          {this.state.displayColorPicker ?
            <div style={popover}>
              <div style={cover} onClick={this.handleClose} />
              <SwatchesPicker />
            </div> : null}
        </li>
      </ul>
    );
  }
}
