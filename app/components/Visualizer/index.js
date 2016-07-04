import { connect } from 'react-redux';
import Visualizer from './presenter';

function mapStateToProps(state) {
  const sequence = state.sequence;
  const label = state.label;

  return {
    sequence: sequence.sequence,
    labels: label.labels,
    positionFrom: sequence.positionFrom,
  };
}

export default connect(mapStateToProps)(Visualizer);
