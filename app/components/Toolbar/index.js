import { connect } from 'react-redux';
import { Nt } from '../../utils/ntseq';
import Toolbar from './presenter';
import { changePositionFrom } from '../../modules/sequence';


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
    positionFrom: sequence.positionFrom,
  };
};

const mapDispatchToProps = (dispatch) => ({
  onPositionFromChange: (event) => {
    let position = parseInt(event.target.value, 10);

    if (isNaN(position) || 1 > position) {
      position = 1;
    }

    dispatch(changePositionFrom(position));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Toolbar);
