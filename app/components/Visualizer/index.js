import { connect } from 'react-redux';
import Visualizer from './presenter';
import {
  update as updateSelection,
  updateSelectionFrom,
  updateSelectionTo,
} from '../../modules/selection';
import * as actions from '../../modules/label';


const mapStateToProps = (state) => {
  const sequence = state.sequence;
  const label = state.label;

  return {
    sequence: sequence.sequence,
    labels: label.labels,
    positionFrom: sequence.positionFrom,
    selectedAnnotation: label.selectedAnnotation,
  };
};

const mapDispatchToProps = (dispatch) => ({
  onNucleotideClick: (newIndex) => {
    dispatch(actions.clearSelectedAnnotation());
    dispatch(updateSelection(newIndex));
  },
  onAnnotationClick: (labelId, annotation, positionFrom) => {
    dispatch(actions.selectAnnotation(labelId, annotation));
    dispatch(updateSelectionFrom(
      annotation.positionFrom - positionFrom
    ));
    dispatch(updateSelectionTo(
      annotation.positionTo - positionFrom
    ));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Visualizer);
