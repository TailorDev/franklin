import React, { Component, PropTypes } from 'react';
import Dropzone from 'react-dropzone';
import Immutable from 'immutable';
import { Events } from '../Store';

import Header from './Header';
import Visualizer from './Visualizer';
import Toolbar from './Toolbar';
import Footer from './Footer';

const { object, string } = PropTypes;


const sequenceSample = 'AAACGAAAACT'.split('');
const someLabels = [
  {
    name: 'Exon',
    color: '#334854',
    isActive: true,
  },
  {
    name: 'Primer',
    color: '#f9c535',
    isActive: true,
  },
  {
    name: 'SNP',
    color: '#e04462',
    isActive: true,
  },
];

export default class App extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      sequence: new Immutable.List(sequenceSample),
      labels: new Immutable.List(someLabels),
    };

    this.onDrop = this.onDrop.bind(this);
    this.onCreateNewLabel = this.onCreateNewLabel.bind(this);
    this.onRemoveLabel = this.onRemoveLabel.bind(this);
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
    this.props.controller.dispatch('action:drop-file', { file: files[0] });
  }

  onCreateNewLabel(label) {
    this.props.controller.dispatch('action:new-label', { label });
  }

  onEditLabel(index, label) {
    this.setState((previousState) => ({
      labels: previousState.labels.update(
        index,
        () => (
          {
            name: label.name,
            color: label.color,
            isActive: true,
          }
        )),
    }));
  }

  onRemoveLabel(index) {
    this.setState((previousState) => ({
      labels: previousState.labels.splice(index, 1),
    }));
  }

  onToggleLabel(index) {
    this.setState((previousState) => ({
      labels: previousState.labels.update(
        index,
        (label) => (
          {
            name: label.name,
            color: label.color,
            isActive: !label.isActive,
          }
        )
      ),
    }));
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
            onToggleLabel={(index) => { this.onToggleLabel(index); }}
            onEditLabel={(index, label) => { this.onEditLabel(index, label); }}
            onRemoveLabel={(index) => { this.onRemoveLabel(index); }}
          />
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
