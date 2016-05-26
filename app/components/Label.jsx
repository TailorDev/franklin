import React, { PropTypes } from 'react';

const { string } = PropTypes;


const Label = (props) =>
  <li className="annotation">
    <i className="fa fa-tag" aria-hidden="true" style={{ color: props.color }}></i> {props.name}
  </li>
;

Label.propTypes = {
  name: string.isRequired,
  color: string.isRequired,
};

export default Label;
