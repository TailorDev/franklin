import React from 'react';


const InputNumber = (props) => {
  let isInvalid = false;
  if (!isNaN(parseInt(props.value, 10))) {
    isInvalid = props.value < props.min;
  }

  return (
    <label className={isInvalid ? 'is-invalid-label' : null}>
      <input
        type="number"
        value={props.value}
        placeholder={props.placeholder}
        onChange={props.onChange}
        disabled={props.isDisabled}
        min={props.min}
        className={isInvalid ? 'is-invalid-input' : null}
      />
      <small className={`form-error${isInvalid ? ' is-visible' : ''}`}>
        {props.errorText || 'Invalid value'}
      </small>
    </label>
  );
};

InputNumber.propTypes = {
  min: React.PropTypes.number.isRequired,
  placeholder: React.PropTypes.string.isRequired,
  onChange: React.PropTypes.func.isRequired,
  isDisabled: React.PropTypes.bool.isRequired,
  // optional
  errorText: React.PropTypes.string,
  value: React.PropTypes.oneOfType([
    React.PropTypes.number,
    React.PropTypes.oneOf(['']),
  ]),
};

export default InputNumber;
