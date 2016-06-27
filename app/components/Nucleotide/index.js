import { connect } from 'react-redux';
import Nucleotide from './presenter';

function mapStateToProps(state, ownProps) {
  const selection = state.selection;

  const isSelected = selection.from === ownProps.index || selection.to === ownProps.index;
  const isInSelectionRange = (selection.from <= ownProps.index && selection.to >= ownProps.index);

  return {
    isSelected,
    isInSelectionRange,
  };
}

export default connect(mapStateToProps)(Nucleotide);
