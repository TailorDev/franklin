import { connect } from 'react-redux';
import * as actions from '../../modules/label';
import { clear as clearSelection } from '../../modules/selection';
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
      dispatch(clearSelection());
      dispatch(actions.selectAnnotation(ownProps.labelId, ownProps.annotation));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Annotation);
