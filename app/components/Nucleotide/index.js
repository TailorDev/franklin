import { connect } from 'react-redux';
import Nucleotide from './presenter';

export const mapStateToProps = (state, ownProps) => {
  const selection = state.selection;
  const exon = state.exon;

  const isSelected =
    0 <
    selection.selections.filter(
      s => s.from === ownProps.index || s.to === ownProps.index
    ).length;

  const isInSelectionRange =
    0 <
    selection.selections.filter(
      s =>
        (s.from <= ownProps.index && s.to >= ownProps.index) ||
        (s.from >= ownProps.index && s.to <= ownProps.index)
    ).length;

  const nbExons = exon.exons.filter(
    e =>
      e.positionFrom <= ownProps.position && e.positionTo >= ownProps.position
  ).size;

  return {
    isSelected,
    isInSelectionRange,
    nbExons,
  };
};

export default connect(mapStateToProps)(Nucleotide);
