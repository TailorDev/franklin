import React from 'react';

import RawInputNumber from './RawInputNumber';


const InputNumber = (props) => {
  let isInvalid = false;
  if (!isNaN(parseInt(props.value, 10)) && props.min) {
    isInvalid = props.value < props.min;
  }

  return (
    <label
      htmlFor={`input-number-${props.className}`}
      className={isInvalid ? 'is-invalid-label' : ''}
    >
      {props.labelText}
      <RawInputNumber
        {...props}
        isInvalid={isInvalid}
      />
      <small className={`form-error${isInvalid ? ' is-visible' : ''}`}>
        {props.errorText}
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

InputNumber.defaultProps = {
  isDisabled: false,
  value: '',
  min: null,
  labelText: null,
  errorText: 'Invalid value',
  className: null,
  placeholder: '',
};

export default InputNumber;
