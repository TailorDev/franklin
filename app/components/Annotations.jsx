import React, { PropTypes } from 'react';
import Immutable from 'immutable';

import Annotation from './Annotation';

const { instanceOf, number } = PropTypes;


const Annotations = (props) =>
  <g>
    {
      props.labels.map((label) =>
        label.annotations.map((annotation, index) =>
          <Annotation
            key={index}
            label={label}
            {...annotation}
            {...props}
          />
        )
      )
    }
  </g>
;

Annotations.propTypes = {
  labels: instanceOf(Immutable.List).isRequired,
  nucleotidesPerRow: number.isRequired,
  rowHeight: number.isRequired,
  nucleotideWidth: number.isRequired,
};

export default Annotations;
