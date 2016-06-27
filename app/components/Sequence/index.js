import { connect } from 'react-redux';
import { update as updateSelection } from '../../modules/selection';
import Sequence from './presenter';

function mapStateToProps() {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    onNucleotideClick: (newIndex) => {
      dispatch(updateSelection(newIndex));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Sequence);
