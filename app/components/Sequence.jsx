import React, { Component, PropTypes } from 'react';
import Immutable from 'immutable';

import Nucleotide from './Nucleotide';

const { object, instanceOf, number } = PropTypes;

export default class Sequence extends Component {

  shouldComponentUpdate(nextProps) {
    return (this.props.sequence !== nextProps.sequence) ||
      (this.props.nucleotidesPerRow !== nextProps.nucleotidesPerRow);
  }

  clearSelection() {
    this.context.controller.dispatch('action:clear-selection');
  }

  handleNucleotideClick(newIndex) {
    this.context.controller.dispatch('action:update-selection', { selected: newIndex });
  }

  render() {
    return (
      <g>
        {
          this.props.sequence.map((nucleotide, index) => {
            const { rowHeight, nucleotidesPerRow, nucleotideWidth } = this.props;
            const boundClick = this.handleNucleotideClick.bind(this, index);
            const x = 10 + (nucleotideWidth * (index % nucleotidesPerRow));
            const y = 10 + (rowHeight * Math.trunc(index / nucleotidesPerRow));

            return (
              <Nucleotide
                x={x}
                y={y}
                type={nucleotide}
                position={index + 1}
                key={index}
                index={index}
                onClick={boundClick}
              />
            );
          })
        }
      </g>
    );
  }
}

Sequence.propTypes = {
  sequence: instanceOf(Immutable.List).isRequired,
  nucleotidesPerRow: number.isRequired,
  rowHeight: number.isRequired,
  nucleotideWidth: number.isRequired,
  // TODO: add other attrs, cf. https://github.com/TailorDev/franklin/issues/3
};

Sequence.contextTypes = {
  controller: object.isRequired,
};
