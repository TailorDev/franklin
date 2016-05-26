import React, { Component, PropTypes } from 'react';
import Dropzone from 'react-dropzone';
import Immutable from 'immutable';

import Header from './Header';
import Visualizer from './Visualizer';
import Toolbar from './Toolbar';
import Footer from './Footer';

const { string } = PropTypes;


const sequenceSample = 'AAACGAAAACT'.split('');
const someLabels = [
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

export default class App extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      sequence: sequenceSample,
      labels: new Immutable.List(someLabels),
    };

    this.reader = new FileReader();

    this.reader.onloadend = this.onFileLoadEnd.bind(this);
    this.onDrop = this.onDrop.bind(this);
    this.onCreateNewLabel = this.onCreateNewLabel.bind(this);
  }

  onFileLoadEnd(evt) {
    if (evt.target.readyState === FileReader.DONE) {
      const parts = evt.target.result.split('\n');
      const sequenceString = parts.slice(1).join('');

      this.setState({
        sequence: sequenceString.split(''),
      });
    }
  }

  onDrop(files) {
    this.reader.readAsText(files[0]);
  }

  onCreateNewLabel(label) {
    this.setState((previousState) => {
      return {
        labels: previousState.labels.push(label),
      };
    });
  }

  render() {
    return (
      <div className="layout">
        <Header />

        <div className="content">
          <Dropzone
            className="dropzone"
            onDrop={this.onDrop}
            disableClick
            multiple={false}
          >
            <Visualizer
              {...this.state}
            />
          </Dropzone>
          <Toolbar
            labels={this.state.labels}
            onCreateNewLabel={this.onCreateNewLabel}
          />
        </div>

        <Footer version={this.props.version} />
      </div>
    );
  }
}

App.propTypes = {
  version: string.isRequired,
};
