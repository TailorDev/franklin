import React from 'react';


const PositionFrom = (props) => (
  <label>
    Starting position
    <input
      type="number"
      value={props.value}
      onChange={props.onChange}
    />
  </label>
);

PositionFrom.propTypes = {
  value: React.PropTypes.number.isRequired,
  onChange: React.PropTypes.func.isRequired,
};

export default PositionFrom;
