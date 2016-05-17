import React, { Component, PropTypes } from 'react';
import Dropzone from 'react-dropzone';

import Header from './Header';
import Visualizer from './Visualizer';
import Toolbar from './Toolbar';
import Footer from './Footer';

const { string } = PropTypes;


const someNucleotides = 'AAACGAAAACT'.split('');

export default class App extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = { nucleotides: someNucleotides };

    this.reader = new FileReader();

    this.reader.onloadend = this.onFileLoadEnd.bind(this);
    this.onDrop = this.onDrop.bind(this);
  }

  onFileLoadEnd(evt) {
    if (evt.target.readyState === FileReader.DONE) {
      const parts = evt.target.result.split('\n');
      const sequence = parts.slice(1).join('');

      this.setState({
        nucleotides: sequence.split(''),
      });
    }
  }

  onDrop(files) {
    this.reader.readAsText(files[0]);
  }

  render() {
    return (
      <div className="layout">
        <Header />

        <div className="content">
          <Dropzone
            onDrop={this.onDrop}
            disableClick="true"
            multiple="false"
            className="dropzone"
          >
            <Visualizer
              nucleotides={this.state.nucleotides}
            />
          </Dropzone>
          <Toolbar />
        </div>

        <Footer version={this.props.version} />
      </div>
    );
  }
}

App.propTypes = {
  version: string.isRequired,
};
