import React, { Component, PropTypes } from 'react';
import debounce from 'lodash.debounce';
import Immutable from 'immutable';

import Sequence from '../Sequence';
import Annotations from '../Annotations';
import Help from './Help';

const { number, object, instanceOf, func } = PropTypes;


class Visualizer extends Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      visualizerMargin: {
        x: 10,
        y: 10,
      },
      nucleotidesPerRow: 80,
      nucleotidesRowHeight: 53,
      nucleotideWidth: 12,
      tracksPerRow: props.labels.size,
      trackHeight: 12,
      rowHeight: 0,
      width: '100%',
      height: '100%',
    };

    this.setWrapperEl = this.setWrapperEl.bind(this);
  }

  componentDidMount() {
    this.resizeListener = debounce(() => {
      this.handleResize(this.props.sequence, this.props.labels);
    }, 500);

    window.addEventListener(
      'resize',
      this.resizeListener,
      false,
    );
  }

  componentWillReceiveProps(nextProps) {
    this.updateVisualizerDimensions(nextProps.sequence, nextProps.labels);
  }

  componentWillUnmount() {
    window.removeEventListener(
      'resize',
      this.resizeListener,
      false,
    );
  }

  setWrapperEl(node) {
    this.$wrapper = node;
  }

  handleResize(sequence, labels) {
    this.updateVisualizerDimensions(sequence, labels);
  }

  updateVisualizerDimensions(sequence, labels) {
    const { visualizerMargin, nucleotideWidth, nucleotidesRowHeight, trackHeight } = this.state;

    // Width must fit the wrapper maximal dimension, i.e. 100%
    const width = this.$wrapper.clientWidth;
    const nucleotidesPerRow = Math.trunc((width - (visualizerMargin.x * 2)) / nucleotideWidth);

    // Height should contain each nucleotides + annotations tracks rows
    const tracksPerRow = labels.size;
    const rowHeight = nucleotidesRowHeight + (tracksPerRow * trackHeight);
    const nRows = Math.trunc(sequence.size / nucleotidesPerRow) + 1;
    const height = visualizerMargin.y + (nRows * rowHeight);

    this.setState({
      nucleotidesPerRow,
      tracksPerRow,
      rowHeight,
      width,
      height,
    });
  }

  render() {
    return (
      <div className="visualizer" ref={this.setWrapperEl}>
        {0 < this.props.sequence.size ?
          <svg
            version="1.1"
            baseProfile="full"
            width={this.state.width}
            height={this.state.height}
          >
            <rect width="100%" height="100%" />

            <Annotations
              labels={this.props.labels}
              positionFrom={this.props.positionFrom}
              onAnnotationClick={this.props.onAnnotationClick}
              selectedAnnotation={this.props.selectedAnnotation}
              {...this.state}
            />

            <Sequence
              sequence={this.props.sequence}
              positionFrom={this.props.positionFrom}
              onNucleotideClick={this.props.onNucleotideClick}
              {...this.state}
            />
          </svg>
          :
          <Help
            onFileSelectClick={this.props.onFileSelectClick}
          />
        }
      </div>
    );
  }
}

Visualizer.propTypes = {
  sequence: instanceOf(Immutable.List).isRequired,
  labels: instanceOf(Immutable.List).isRequired,
  positionFrom: number.isRequired,
  onFileSelectClick: func.isRequired,
  onNucleotideClick: func.isRequired,
  onAnnotationClick: func.isRequired,
  selectedAnnotation: object,
};

Visualizer.defaultProps = {
  selectedAnnotation: null,
};

export default Visualizer;
