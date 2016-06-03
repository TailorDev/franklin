import React, { Component, PropTypes } from 'react';
import Dropzone from 'react-dropzone';
import { Events } from '../Store';

import Header from './Header';
import Visualizer from './Visualizer';
import Toolbar from './Toolbar';
import Footer from './Footer';
import Loader from './Loader';

const { object, string } = PropTypes;


export default class App extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = props.controller.getState();

    this.onDrop = this.onDrop.bind(this);
  }

  getChildContext() {
    // Pass the controller to child components.
    return {
      controller: this.props.controller,
    };
  }

  componentDidMount() {
    this.props.controller.on(Events.CHANGE, (state) => {
      this.setState(state);
    });
  }

  onDrop(files) {
    this.props.controller.dispatch('action:drop-file', {
      file: files[0],
    });
  }

  render() {
    return (
      <div className="layout">
        <Header />

        <div className="content">
          <Loader />
          <Dropzone
            className="dropzone"
            onDrop={this.onDrop}
            disableClick
            multiple={false}
          >
            <Visualizer sequence={this.state.sequence} />
          </Dropzone>
          <Toolbar labels={this.state.labels} />
        </div>

        <Footer version={this.props.version} />
      </div>
    );
  }
}

App.propTypes = {
  version: string.isRequired,
  controller: object.isRequired,
};

App.childContextTypes = {
  controller: object,
};
