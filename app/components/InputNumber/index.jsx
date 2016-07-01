import React from 'react';

import RawInputNumber from './RawInputNumber';


const InputNumber = (props) => {
  let isInvalid = false;
  if (!isNaN(parseInt(props.value, 10)) && props.min) {
    isInvalid = props.value < props.min;
  }

  return (
    <label className={isInvalid ? 'is-invalid-label' : ''}>
      {props.labelText || null}
      <RawInputNumber
        {...props}
        isInvalid={isInvalid}
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
  className: React.PropTypes.string,
};

export default InputNumber;
