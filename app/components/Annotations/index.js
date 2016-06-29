import { connect } from 'react-redux';
import Annotations from './presenter';

const mapStateToProps = (state) => {
  const sequence = state.sequence;

  return {
    positionFrom: sequence.positionFrom,
  };
};

export default connect(mapStateToProps)(Annotations);
