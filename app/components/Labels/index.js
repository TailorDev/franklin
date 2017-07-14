import { connect } from 'react-redux';
import * as actions from '../../modules/label';
import Labels from './presenter';

function mapStateToProps(state) {
  const label = state.label;

  return {
    labels: label.labels,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onToggleLabel: index => {
      dispatch(actions.toggleAt(index));
    },
    onEditLabel: (index, label) => {
      dispatch(actions.updateAt(index, label));
    },
    onRemoveLabel: index => {
      dispatch(actions.removeAt(index));
    },
    onCreateNewLabel: label => {
      dispatch(actions.create(label));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Labels);
