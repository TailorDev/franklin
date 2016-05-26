import React, { Component, PropTypes } from 'react';
import debounce from 'lodash.debounce';

import Sequence from './Sequence';

const { array } = PropTypes;

export default class Visualizer extends Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      nucleotidesPerRow: 80,
      rowHeight: 50,
      nucleotideWidth: 12,
      visualizerWidth: '100%',
      visualizerHeight: '100%',
    };
  }

  componentDidMount() {
    window.addEventListener(
      'resize',
      debounce(() => { this.handleResize(this.props.sequence); }, 500),
      false
    );
  }

  componentWillReceiveProps(nextProps) {
    this.updateVisualizerDimensions(nextProps.sequence);
  }

  componentWillUnmount() {
    window.removeEventListener(
      'resize',
      () => { this.handleResize(this.props.sequence); },
      false
    );
  }

  handleResize(sequence) {
    this.updateVisualizerDimensions(sequence);
  }

  updateVisualizerDimensions(sequence) {
    const { nucleotideWidth, rowHeight } = this.state;
    // Width must fit the wrapper maximal dimension, i.e. 100%
    const width = this.refs.wrapper.clientWidth;
    const nt = Math.trunc((width - 20) / nucleotideWidth);
    // Should contain each row
    const height = 10 + (Math.trunc(sequence.length / nt) + 1) * rowHeight;
    this.setState({
      nucleotidesPerRow: nt,
      visualizerWidth: width,
      visualizerHeight: height,
    });
  }

  render() {
    return (
      <div className="visualizer" ref="wrapper">
        <svg
          version="1.1"
          baseProfile="full"
          width={this.state.visualizerWidth}
          height={this.state.visualizerHeight}
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="100%" height="100%" />

          <Sequence
            sequence={this.props.sequence}
            {...this.state}
          />
        </svg>
      </div>
    );
  }
}

Visualizer.propTypes = {
  sequence: array.isRequired,
};
