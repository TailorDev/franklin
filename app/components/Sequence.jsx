import React, { Component, PropTypes } from 'react';
import Immutable from 'immutable';

import Nucleotide from './Nucleotide';

const { object, instanceOf, number } = PropTypes;

export default class Sequence extends Component {

  handleNucleotideClick(newIndex) {
    this.context.controller.dispatch('action:update-selection', { selected: newIndex });
  }

  render() {
    return (
      <g>
        {this.props.sequence.map((nucleotide, index) =>
          <Nucleotide
            type={nucleotide}
            position={this.props.positionFrom + index}
            key={index}
            index={index}
            onClick={() => { this.handleNucleotideClick(index); }}
            {...this.props}
          />
        )}
      </g>
    );
  }
}

Sequence.propTypes = {
  sequence: instanceOf(Immutable.List).isRequired,
  positionFrom: number.isRequired,
  visualizerMargin: object.isRequired,
  nucleotidesPerRow: number.isRequired,
  nucleotidesRowHeight: number.isRequired,
  nucleotideWidth: number.isRequired,
  trackHeight: number.isRequired,
  rowHeight: number.isRequired,
  // TODO: add other attrs, cf. https://github.com/TailorDev/franklin/issues/3
};

Sequence.contextTypes = {
  controller: object.isRequired,
};
