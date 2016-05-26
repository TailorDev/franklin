import React, { Component, PropTypes } from 'react';
import Immutable from 'immutable';

import Nucleotide from './Nucleotide';

const { instanceOf, number } = PropTypes;

export default class Sequence extends Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      selection: new Immutable.OrderedSet(),
    };
  }

  clearSelection() {
    this.setState({ selection: this.state.selection.clear() });
  }

  updateSelection(selected) {
    this.setState((previousState) => {
      let previousSelection = previousState.selection;
      if (2 <= previousState.selection.size) {
        previousSelection = previousState.selection.slice(1);
      }
      return {
        selection: previousSelection.has(selected) ?
          previousSelection.delete(selected) :
          previousSelection.add(selected),
      };
    });
  }

  handleNucleotideClick(newIndex) {
    this.updateSelection(newIndex);
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
                isSelected={this.state.selection.includes(index)}
                isInSelectionRange={
                  index <= this.state.selection.max() &&
                  index >= this.state.selection.min()
                }
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
