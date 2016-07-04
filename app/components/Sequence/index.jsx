import React, { Component, PropTypes } from 'react';
import Immutable from 'immutable';

import Nucleotide from '../Nucleotide';

const { func, object, instanceOf, number } = PropTypes;

class Sequence extends Component {

  shouldComponentUpdate(nextProps) {
    return this.props.positionFrom !== nextProps.positionFrom ||
      this.props.sequence !== nextProps.sequence ||
      this.props.nucleotidesPerRow !== nextProps.nucleotidesPerRow ||
      this.props.rowHeight !== nextProps.rowHeight;
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
            onClick={this.props.onNucleotideClick}
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
  onNucleotideClick: func.isRequired,
  // TODO: add other attrs, cf. https://github.com/TailorDev/franklin/issues/3
};

export default Sequence;
