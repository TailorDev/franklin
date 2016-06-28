import { connect } from 'react-redux';
import Toolbar from './presenter';

const mapStateToProps = (state) => {
  const sequence = state.sequence;
  const label = state.label;

  return {
    name: sequence.name,
    sequence: sequence.sequence,
    ntSequence: sequence.ntSequence,
    labels: label.labels,
  };
}

export default connect(mapStateToProps)(Toolbar);
