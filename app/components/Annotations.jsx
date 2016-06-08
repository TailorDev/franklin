import React, { PropTypes } from 'react';
import Immutable from 'immutable';

import Annotation from './Annotation';
import { getAnnotationSegmentCoordinates } from '../utils/positionning';

const { object, instanceOf, number } = PropTypes;


const Annotations = (props) =>
  <g>
    {
      props.labels.map((label, labelIndex) =>
        label.annotations.map((annotation, annotationIndex) =>
          <Annotation
            key={annotationIndex}
            label={label}
            labelId={labelIndex}
            annotation={annotation}
            getAnnotationSegmentCoordinates={(indexFrom, indexTo) => getAnnotationSegmentCoordinates(
              indexFrom,
              indexTo,
              labelIndex, // current track
              props.visualizerMargin,
              props.nucleotidesPerRow,
              props.nucleotideWidth,
              props.rowHeight,
              props.nucleotidesRowHeight,
              props.trackHeight
            )}
            nucleotidesPerRow={props.nucleotidesPerRow}
          />
        )
      )
    }
  </g>
;

Annotations.propTypes = {
  labels: instanceOf(Immutable.List).isRequired,
  visualizerMargin: object.isRequired,
  nucleotidesPerRow: number.isRequired,
  nucleotidesRowHeight: number.isRequired,
  nucleotideWidth: number.isRequired,
  trackHeight: number.isRequired,
  rowHeight: number.isRequired,
};

export default Annotations;
