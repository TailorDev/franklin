import React from 'react';


const PositionFrom = (props) => (
  <input
    type="number"
    value={props.value}
    onChange={props.onChange}
  />
);

PositionFrom.propTypes = {
  value: React.PropTypes.number.isRequired,
  onChange: React.PropTypes.func.isRequired,
};

export default PositionFrom;
