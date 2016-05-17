import React, { PropTypes } from 'react';

const { string } = PropTypes;


const Label = (props) =>
  <li className="annotation">
    <span style={{ backgroundColor: props.color }}>&nbsp;</span> {props.name}
  </li>
;

Label.propTypes = {
  name: string.isRequired,
  color: string.isRequired,
};

export default Label;
