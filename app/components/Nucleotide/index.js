import { connect } from 'react-redux';
import Nucleotide from './presenter';

export const mapStateToProps = (state, ownProps) => {
  const selection = state.selection;
  const exon = state.exon;

  const isSelected = (0 < selection.selections.filter(
    s => (s.from === ownProps.index || s.to === ownProps.index)
  ).length);

  const isInSelectionRange = (0 < selection.selections.filter(s => {
    return (s.from <= ownProps.index && s.to >= ownProps.index) ||
      (s.from >= ownProps.index && s.to <= ownProps.index);
  }).length);

  const isInExon = (0 < exon.exons.filter(
    e => e.positionFrom <= ownProps.index && e.positionTo >= ownProps.index
  ).size);

  return {
    isSelected,
    isInSelectionRange,
    isInExon,
  };
};

export default connect(mapStateToProps)(Nucleotide);
