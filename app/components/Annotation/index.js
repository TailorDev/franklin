import { connect } from 'react-redux';
import * as actions from '../../modules/label';
import Annotation from './presenter';

function mapStateToProps(state, ownProps) {
  const label = state.label;

  return {
    isSelected: ownProps.annotation === label.annotation,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onClick: (labelId, annotation) => {
      dispatch(actions.selectAnnotation(labelId, annotation));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Annotation);
