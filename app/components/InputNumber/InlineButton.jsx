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
            title={props.titleText || null}
            disabled={props.hasButtonDisabled || false}
          >
            {props.children}
          </button>
        </div>
      </div>
      <small className={`form-error${isInvalid ? ' is-visible' : ''}`}>
        {props.errorText || 'Invalid value'}
      </small>
    </div>
  );
};

InlineButton.propTypes = {
  onChange: React.PropTypes.func.isRequired,
  onClick: React.PropTypes.func.isRequired,
  children: React.PropTypes.oneOfType([
    React.PropTypes.object.isRequired,
    React.PropTypes.string.isRequired,
  ]),
  // optional
  isDisabled: React.PropTypes.bool,
  placeholder: React.PropTypes.string,
  min: React.PropTypes.number,
  errorText: React.PropTypes.string,
  value: React.PropTypes.oneOfType([
    React.PropTypes.number,
    React.PropTypes.oneOf(['']),
  ]),
  className: React.PropTypes.string,
  titleText: React.PropTypes.string,
  hasButtonDisabled: React.PropTypes.bool,
};

export default InlineButton;
