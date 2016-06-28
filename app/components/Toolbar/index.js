import { connect } from 'react-redux';
import Toolbar from './presenter';

function mapStateToProps(state) {
  const sequence = state.sequence;
  const label = state.label;

  return {
    sequence: sequence.sequence,
    labels: label.labels,
  };
}

export default connect(mapStateToProps)(Toolbar);
