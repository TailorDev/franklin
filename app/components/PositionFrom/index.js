import { connect } from 'react-redux';
import PositionFrom from './presenter';
import { changePositionFrom } from '../../modules/sequence';

const mapStateToProps = (state) => {
  const sequence = state.sequence;

  return {
    value: sequence.positionFrom,
  };
};

const mapDispatchToProps = (dispatch) => ({
  onChange: (event) => {
    let position = parseInt(event.target.value, 10);

    if (isNaN(position)) {
      position = 1;
    }

    dispatch(changePositionFrom(position));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(PositionFrom);
