import React from 'react';


const tickPosition = {
  x: 5,
  y: 4,
};

const Line = props => (
  <g>
    <line
      x1={props.x1}
      x2={props.x2}
      y1={props.y1}
      y2={props.y2}
      className="annotation-segment"
      stroke={props.color}
    />
    {props.hasTick ?
      <line
        x1={props.isReverse ? props.x1 : props.x2}
        x2={props.isReverse ? props.x1 + tickPosition.x : props.x2 - tickPosition.x}
        y1={props.isReverse ? props.y1 : props.y2}
        y2={props.isReverse ? props.y1 + tickPosition.y : props.y2 - tickPosition.y}
        stroke={props.color}
        className={`annotation-tick ${props.isReverse ? 'reverse' : 'forward'}`}
      /> : null
    }
  </g>
);

Line.propTypes = {
  x1: React.PropTypes.number.isRequired,
  x2: React.PropTypes.number.isRequired,
  y1: React.PropTypes.number.isRequired,
  y2: React.PropTypes.number.isRequired,
  color: React.PropTypes.string.isRequired,
  hasTick: React.PropTypes.bool.isRequired,
  isReverse: React.PropTypes.bool.isRequired,
};

export default Line;
