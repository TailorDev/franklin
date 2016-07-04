import React, { Component, PropTypes } from 'react';
import Dropzone from 'react-dropzone';
import { HotKeys } from 'react-hotkeys';
import { connect } from 'react-redux';

import Header from './Header';
import Visualizer from './Visualizer';
import Toolbar from './Toolbar';
import Footer from './Footer';
import Loader from './Loader';
import Disclaimer from './Disclaimer';

import * as actions from '../modules/franklin';


const keyMap = {
  clearSelection: 'esc',
};

export class App extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = { displayModal: true };

    this.onDropAccepted = this.onDropAccepted.bind(this);
    this.startDemo = this.startDemo.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.onFileSelectClick = this.onFileSelectClick.bind(this);
  }

  onDropAccepted(files) {
    this.props.dispatch(actions.loadFile(files[0]));
    this.closeModal();
  }

  onFileSelectClick() {
    this.refs.dropzone.open();
  }

  startDemo() {
    this.props.dispatch(actions.loadDefault());
    this.closeModal();
  }

  closeModal() {
    this.setState({ displayModal: false });
  }

  render() {
    const keyHandlers = {
      clearSelection: () => { this.props.dispatch(actions.clear()); },
    };

    return (
      <div className="layout">
        <Disclaimer
          isVisible={this.state.displayModal}
          onDemoClick={this.startDemo}
          onCloseClick={this.closeModal}
        />

        <Header />

        <HotKeys keyMap={keyMap} handlers={keyHandlers}>
          <div className="content">
            <Loader />
            <Dropzone
              ref="dropzone"
              className="dropzone"
              activeClassName="drag-enter"
              onDropAccepted={this.onDropAccepted}
              disableClick
              disablePreview
              multiple={false}
            >
              <Visualizer
                onFileSelectClick={this.onFileSelectClick}
              />
            </Dropzone>
            <Toolbar />
          </div>
        </HotKeys>

        <Footer version={this.props.version} />
      </div>
    );
  }
}

App.propTypes = {
  version: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(App);
