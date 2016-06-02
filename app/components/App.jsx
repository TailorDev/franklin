import React, { Component, PropTypes } from 'react';
import Dropzone from 'react-dropzone';
<<<<<<< HEAD
import { Events } from '../Store';
=======
import Immutable from 'immutable';
import Modal from 'react-modal';
>>>>>>> Add welcome modal with a disclaimer

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
    this.startDemo = this.startDemo.bind(this);
    this.closeModal = this.closeModal.bind(this);
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

  startDemo() {
    this.props.controller.dispatch('action:start-demo');
  }

  closeModal() {
    this.props.controller.dispatch('action:close-modal');
  }

  render() {
    return (
      <div className="layout">
        <Modal
          overlayClassName="modal-overlay"
          className="modal-content"
          isOpen={this.state.modalIsOpen}
          shouldCloseOnOverlayClick={false}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
        >
          <h2>Disclaimer</h2>

          <p>
            <a href="https://franklin.lelab.tailordev.fr">Franklin</a> is a
            proof of concept. It is not ready for production. You can&nbsp;
            <a href="https://tailordev.fr/blog/2016/06/03/le-lab-3-franklin-dna-sequence-annotation-tool">read more about the story behind it</a>,&nbsp;
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
