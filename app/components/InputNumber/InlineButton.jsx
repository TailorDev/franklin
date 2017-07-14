import PropTypes from 'prop-types';
import React from 'react';

import RawInputNumber from './RawInputNumber';


const InlineButton = (props) => {
  let isInvalid = false;
  if (!isNaN(parseInt(props.value, 10)) && props.min) {
    isInvalid = props.value < props.min;
  }

  return (
    <div className="input-number inline-button">
      <div className="input-group">
        <RawInputNumber
          {...props}
          isInvalid={isInvalid}
        />
        <div className="input-group-button">
          <button
            onClick={props.onClick}
            className="button"
            title={props.titleText}
            disabled={props.hasButtonDisabled || false}
          >
            {props.children}
          </button>
        </div>
      </div>
      <small className={`form-error${isInvalid ? ' is-visible' : ''}`}>
        {props.errorText}
      </small>
    </div>
  );
};

InlineButton.propTypes = {
  onChange: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.object.isRequired,
    PropTypes.string.isRequired,
  ]),
  // optional
  isDisabled: PropTypes.bool,
  placeholder: PropTypes.string,
  min: PropTypes.number,
  errorText: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.oneOf(['']),
  ]),
  className: PropTypes.string,
  titleText: PropTypes.string,
  hasButtonDisabled: PropTypes.bool,
};

InlineButton.defaultProps = {
  children: null,
  errorText: 'Invalid value',
  isDisabled: false,
  placeholder: null,
  min: null,
  value: '',
  className: null,
  titleText: null,
  hasButtonDisabled: false,
};

export default InlineButton;
