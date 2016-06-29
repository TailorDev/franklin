import { connect } from 'react-redux';
import { Nt } from '../../utils/ntseq';
import Toolbar from './presenter';


export const mapStateToProps = (state) => {
  const sequence = state.sequence;
  const label = state.label;

  let ntSequence = null;
  if (0 < sequence.sequence.size) {
    ntSequence = (new Nt.Seq()).read(sequence.sequence.join(''));
  }

  return {
    name: sequence.name,
    sequence: sequence.sequence,
    labels: label.labels,
    ntSequence,
  };
};

export default connect(mapStateToProps)(Toolbar);
