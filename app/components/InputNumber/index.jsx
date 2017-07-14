import PropTypes from 'prop-types';
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
  onChange: PropTypes.func.isRequired,
  // optional
  isDisabled: PropTypes.bool,
  placeholder: PropTypes.string,
  min: PropTypes.number,
  errorText: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.oneOf(['']),
  ]),
  labelText: PropTypes.string,
  className: PropTypes.string,
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
