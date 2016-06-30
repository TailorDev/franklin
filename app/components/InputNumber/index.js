import React from 'react';


const InputNumber = (props) => {
  let isInvalid = false;
  if (!isNaN(parseInt(props.value, 10)) && props.min) {
    isInvalid = props.value < props.min;
  }

  return (
    <label className={isInvalid ? 'is-invalid-label' : null}>
      {props.labelText || null}
      <input
        type="number"
        value={props.value}
        placeholder={props.placeholder || null}
        onChange={props.onChange}
        disabled={props.isDisabled || false}
        min={props.min || null}
        className={isInvalid ? 'is-invalid-input' : null}
      />
      <small className={`form-error${isInvalid ? ' is-visible' : ''}`}>
        {props.errorText || 'Invalid value'}
      </small>
    </label>
  );
};

InputNumber.propTypes = {
  onChange: React.PropTypes.func.isRequired,
  // optional
  isDisabled: React.PropTypes.bool,
  placeholder: React.PropTypes.string,
  min: React.PropTypes.number,
  errorText: React.PropTypes.string,
  value: React.PropTypes.oneOfType([
    React.PropTypes.number,
    React.PropTypes.oneOf(['']),
  ]),
  labelText: React.PropTypes.string,
};

export default InputNumber;
