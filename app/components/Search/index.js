import { connect } from 'react-redux';
import Search from './presenter';
import { Nt } from '../../utils/ntseq';
import * as actions from '../../modules/search';
import { multiSelect } from '../../modules/selection';


const mapStateToProps = (state) => {
  const search = state.search;

  return {
    value: search.value,
    matches: search.matches,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  onChange: (event) => {
    const q = (new Nt.Seq()).read(event.target.value);
    const len = event.target.value.length;

    const matches = ownProps.ntSequence.mapSequence(q).results().filter(
      result => 0 < result.matches && len <= result.matches
    );

    dispatch(actions.search(event.target.value, matches.length));
    dispatch(multiSelect(matches.map((m) => ({
      from: m.pos,
      to: m.pos + len - 1,
    }))));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);
