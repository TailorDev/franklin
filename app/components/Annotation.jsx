import React, { PropTypes } from 'react';

const { number, object, string } = PropTypes;


const Annotation = (props) =>
  <line
    x1="125"
    x2="300"
    y1="65"
    y2="65"
    className="annotation"
    stroke={props.label.color}
  />
;

Annotation.propTypes = {
  positionFrom: number.isRequired,
  positionTo: number.isRequired,
  label: object.isRequired,
  comment: string,
};

export default Annotation;
