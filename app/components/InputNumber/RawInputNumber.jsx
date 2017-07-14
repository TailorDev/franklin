import PropTypes from 'prop-types';
import React from 'react';


const RawInputNumber = props =>
  <input
    type="number"
    name={`input-number-${props.className}`}
    value={props.value}
    placeholder={props.placeholder || null}
    onChange={props.onChange}
    disabled={props.isDisabled || false}
    min={props.min || null}
    className={`
      ${props.className}
      ${props.isInvalid ? 'is-invalid-input' : ''}
    `}
  />
;

RawInputNumber.propTypes = {
  onChange: PropTypes.func.isRequired,
  // optional
  isDisabled: PropTypes.bool,
  isInvalid: PropTypes.bool,
  placeholder: PropTypes.string,
  min: PropTypes.number,
  value: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.oneOf(['']),
  ]),
  className: PropTypes.string,
};

RawInputNumber.defaultProps = {
  isDisabled: false,
  isInvalid: false,
  placeholder: null,
  min: null,
  value: '',
  className: null,
};

export default RawInputNumber;
