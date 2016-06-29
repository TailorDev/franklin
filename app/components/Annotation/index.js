import { connect } from 'react-redux';
import * as actions from '../../modules/label';
import { updateSelectionFrom, updateSelectionTo } from '../../modules/selection';
import Annotation from './presenter';

function mapStateToProps(state, ownProps) {
  const label = state.label;

  let isSelected = false;
  if (label.selectedAnnotation && ownProps.annotation) {
    isSelected = ownProps.annotation === label.selectedAnnotation.annotation;
  }

  return {
    isSelected,
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    onClick: () => {
      dispatch(actions.selectAnnotation(ownProps.labelId, ownProps.annotation));
      dispatch(updateSelectionFrom(
        ownProps.annotation.positionFrom - ownProps.positionFrom
      ));
      dispatch(updateSelectionTo(
        ownProps.annotation.positionTo - ownProps.positionFrom
      ));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Annotation);
