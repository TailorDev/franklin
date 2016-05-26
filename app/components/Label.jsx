import React, { PropTypes } from 'react';

const { string } = PropTypes;


const Label = (props) =>
  <li className="annotation">
    <i className="fa fa-tag" aria-hidden="true" style={{ color: props.color }}></i>
    {props.name}
    <span className="label-tools">
      <i
        className="fa fa-adjust"
        aria-hidden="true"
        title="Toggle active"
      />
      <i
        className="fa fa-pencil"
        aria-hidden="true"
        title="Edit"
      />
      <i
        className="fa fa-times"
        aria-hidden="true"
        title="Remove"
      />
    </span>
  </li>
;

Label.propTypes = {
  name: string.isRequired,
  color: string.isRequired,
};

export default Label;
