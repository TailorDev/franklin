import { connect } from 'react-redux';
import { Nt } from '../../utils/ntseq';
import Toolbar from './presenter';


export const mapStateToProps = (state) => {
  const sequence = state.sequence;
  const label = state.label;
  const exon = state.exon;

  let ntSequence = null;
  if (0 < sequence.sequence.size) {
    ntSequence = (new Nt.Seq()).read(sequence.sequence.join(''));
  }

  return {
    name: sequence.name,
    sequence: sequence.sequence,
    labels: label.labels,
    ntSequence,
    exons: exon.exons,
  };
};

export default connect(mapStateToProps)(Toolbar);
