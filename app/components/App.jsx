import React, { Component, PropTypes } from 'react';
import Dropzone from 'react-dropzone';
import Modal from 'react-modal';
import { HotKeys } from 'react-hotkeys';
import { connect } from 'react-redux';

import Header from './Header';
import Visualizer from './Visualizer';
import Toolbar from './Toolbar';
import Footer from './Footer';
import Loader from './Loader';

import * as sequenceActions from '../modules/sequence';
import * as selectionActions from '../modules/selection';
import * as labelActions from '../modules/label';
import { loadDefault } from '../modules/franklin';


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
  }

  onDropAccepted(files) {
    this.props.dispatch(sequenceActions.loadFile(files[0]));
    this.props.dispatch(labelActions.loadEmpty());
    this.closeModal();
  }

  startDemo() {
    this.props.dispatch(loadDefault());
    this.closeModal();
  }

  closeModal() {
    this.setState({ displayModal: false });
  }

  render() {
    const keyHandlers = {
      clearSelection: () => {
        this.props.dispatch(selectionActions.clear());
        this.props.dispatch(labelActions.clearSelectedAnnotation());
      },
    };

    return (
      <div className="layout">
        <Modal
          overlayClassName="modal-overlay"
          className="modal-content"
          isOpen={this.state.displayModal}
          shouldCloseOnOverlayClick={false}
        >
          <h2>Disclaimer</h2>

          <p>
            <a href="https://franklin.lelab.tailordev.fr">Franklin</a> is a
            proof of concept. It is not suitable for production. You can&nbsp;
            <a href="https://tailordev.fr/blog/2016/06/09/le-lab-3-franklin-dna-sequence-annotation-tool">read more about the story behind it</a>,&nbsp;
            <a href="https://github.com/TailorDev/franklin">checkout the sources</a> and&nbsp;
            <a href="https://github.com/TailorDev/franklin/issues">give us feedback</a>!
          </p>

          <p>That said, now choose your way:</p>

          <button
            className="button primary"
            onClick={this.startDemo}
          >
            Test Franklin with sample data
          </button>

          <button
            className="button secondary"
            onClick={this.closeModal}
          >
            Please leave me alone
          </button>
        </Modal>

        <Header />

        <HotKeys keyMap={keyMap} handlers={keyHandlers}>
          <div className="content">
            <Loader />
            <Dropzone
              className="dropzone"
              activeClassName="drag-enter"
              onDropAccepted={this.onDropAccepted}
              disableClick
              disablePreview
              multiple={false}
            >
              <Visualizer />
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
