import Immutable from 'immutable';
import React, { Component, PropTypes } from 'react';

import Nucleotide from './Nucleotide';

const { array } = PropTypes;

export default class Sequence extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      selection: new Immutable.OrderedSet(),
    };
  }

  updateSelection(selected) {
    this.setState({
      selection: this.state.selection.has(selected) ?
        this.state.selection.delete(selected) :
        this.state.selection.add(selected),
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
            const boundClick = this.handleNucleotideClick.bind(this, index);
            return (
              <Nucleotide
                x={5 + (12 * index)}
                y={30}
                type={nucleotide}
                position={index + 1}
                key={index}
                isSelected={this.state.selection.includes(index)}
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
  sequence: array.isRequired,
  // TODO: add other attrs, cf. https://github.com/TailorDev/franklin/issues/3
};
