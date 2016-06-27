import { connect } from 'react-redux';
import Loader from './presenter';

function mapStateToProps(state) {
  const sequence = state.sequence;

  return {
    display: sequence.loading,
  };
}

export default connect(mapStateToProps)(Loader);
