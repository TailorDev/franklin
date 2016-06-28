import { connect } from 'react-redux';
import Search from './presenter';
import { Nt } from '../../utils/ntseq';
import { multiSelect } from '../../modules/selection';

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onChange: (event) => {
      const q = (new Nt.Seq()).read(event.target.value);
      const len = event.target.value.length;

      const matches = ownProps.ntSequence.mapSequence(q).results().filter(
        result => 0 < result.matches && len <= result.matches
      );

      dispatch(multiSelect(matches.map((m) => {
        return {
          from: m.pos,
          to: m.pos + len - 1,
        };
      })));
    },
  };
};

export default connect(null, mapDispatchToProps)(Search);
