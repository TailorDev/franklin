import { connect } from 'react-redux';
import Visualizer from './presenter';
import { update as updateSelection } from '../../modules/selection';
import { clearSelectedAnnotation } from '../../modules/label';


const mapStateToProps = (state) => {
  const sequence = state.sequence;
  const label = state.label;

  return {
    sequence: sequence.sequence,
    labels: label.labels,
    positionFrom: sequence.positionFrom,
  };
};

const mapDispatchToProps = (dispatch) => ({
  onNucleotideClick: (newIndex) => {
    dispatch(clearSelectedAnnotation());
    dispatch(updateSelection(newIndex));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Visualizer);
