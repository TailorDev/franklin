import React, { Component, PropTypes } from 'react';
import Immutable from 'immutable';

import Annotation from '../Annotation';
import { getAnnotationSegments } from '../../utils/positionning';

const { func, object, instanceOf, number } = PropTypes;


class Annotations extends Component {
  constructor(props, context) {
    super(props, context);

    this.getAnnotationSegments = this.getAnnotationSegments.bind(this);
  }

  getAnnotationSegments(labelIndex, indexFrom, indexTo) {
    return getAnnotationSegments(
      indexFrom - this.props.positionFrom + 1,
      indexTo - this.props.positionFrom + 1,
      labelIndex, // current track
      this.props.visualizerMargin,
      this.props.nucleotidesPerRow,
      this.props.nucleotideWidth,
      this.props.rowHeight,
      this.props.nucleotidesRowHeight,
      this.props.trackHeight
    );
  }

  render() {
    return (
      <g>
        {
          this.props.labels.map((label, labelIndex) =>
            label.annotations.map((annotation, annotationIndex) =>
              <Annotation
                key={annotationIndex}
                label={label}
                labelId={labelIndex}
                annotation={annotation}
                isSelected={
                  (this.props.selectedAnnotation &&
                    this.props.selectedAnnotation.annotation === annotation) || false
                }
                getAnnotationSegments={this.getAnnotationSegments}
                positionFrom={this.props.positionFrom}
                onClick={this.props.onAnnotationClick}
              />
            )
          )
        }
      </g>
    );
  }
}

Annotations.propTypes = {
  labels: instanceOf(Immutable.List).isRequired,
  visualizerMargin: object.isRequired,
  nucleotidesPerRow: number.isRequired,
  nucleotidesRowHeight: number.isRequired,
  nucleotideWidth: number.isRequired,
  trackHeight: number.isRequired,
  rowHeight: number.isRequired,
  positionFrom: number.isRequired,
  onAnnotationClick: func.isRequired,
  selectedAnnotation: object,
};

export default Annotations;
