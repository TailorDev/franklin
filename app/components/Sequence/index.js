import { connect } from 'react-redux';
import { update as updateSelection } from '../../modules/selection';
import { clearSelectedAnnotation } from '../../modules/label';
import Sequence from './presenter';

const mapStateToProps = (state) => {
  const sequence = state.sequence;

  return {
    positionFrom: sequence.positionFrom,
  };
};

const mapDispatchToProps = (dispatch) => ({
  onNucleotideClick: (newIndex) => {
    dispatch(clearSelectedAnnotation());
    dispatch(updateSelection(newIndex));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Sequence);
