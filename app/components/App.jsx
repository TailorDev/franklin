import React, { Component, PropTypes } from 'react';
import Dropzone from 'react-dropzone';

import Header from './Header';
import Visualizer from './Visualizer';
import Toolbar from './Toolbar';
import Footer from './Footer';

const { string } = PropTypes;


const sequenceSample = 'AAACGAAAACT'.split('');

export default class App extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = { sequence: sequenceSample };

    this.reader = new FileReader();

    this.reader.onloadend = this.onFileLoadEnd.bind(this);
    this.onDrop = this.onDrop.bind(this);
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
              sequence={this.state.sequence}
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
