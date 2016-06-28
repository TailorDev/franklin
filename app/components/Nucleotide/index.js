import { connect } from 'react-redux';
import Nucleotide from './presenter';

export const mapStateToProps = (state, ownProps) => {
  const selection = state.selection;

  const isSelected = (0 < selection.selections.filter(
    s => (s.from === ownProps.index || s.to === ownProps.index)
  ).length);

  const isInSelectionRange = (0 < selection.selections.filter(
    s => (s.from <= ownProps.index && s.to >= ownProps.index)
  ).length);
  const isInExon = false;

  return {
    isSelected,
    isInSelectionRange,
    isInExon,
  };
};

export default connect(mapStateToProps)(Nucleotide);
