import React from 'react';


const RawInputNumber = (props) =>
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
  onChange: React.PropTypes.func.isRequired,
  // optional
  isDisabled: React.PropTypes.bool,
  isInvalid: React.PropTypes.bool,
  placeholder: React.PropTypes.string,
  min: React.PropTypes.number,
  value: React.PropTypes.oneOfType([
    React.PropTypes.number,
    React.PropTypes.oneOf(['']),
  ]),
  className: React.PropTypes.string,
};

export default RawInputNumber;
