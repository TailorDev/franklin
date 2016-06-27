import React from 'react';

import AnnotationForm from '../AnnotationForm';
import Labels from '../Labels';

export default (props) =>
  <div className="toolbar">
    <div className="annotation-panel">
      <h4>Annotation</h4>
      <AnnotationForm {...props} />
    </div>

    <div className="label-panel">
      <h4>Labels</h4>
      <Labels {...props} />
    </div>
  </div>
;
