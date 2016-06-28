import React from 'react';
import Immutable from 'immutable';

import AnnotationForm from '../AnnotationForm';
import Labels from '../Labels';

const Toolbar = (props) => (
  <div className="toolbar">
    <div className="sequence-panel">
      <h4>Sequence</h4>
      <p>{props.name}</p>
    </div>

    <div className="annotation-panel">
      <h4>Annotation</h4>
      <AnnotationForm
        sequence={props.sequence}
        labels={props.labels}
      />
    </div>

    <div className="label-panel">
      <h4>Labels</h4>
      <Labels
        sequence={props.sequence}
        labels={props.labels}
      />
    </div>
  </div>
);

Toolbar.propTypes = {
  name: React.PropTypes.string.isRequired,
  sequence: React.PropTypes.instanceOf(Immutable.List).isRequired,
  labels: React.PropTypes.instanceOf(Immutable.List).isRequired,
};

export default Toolbar;
