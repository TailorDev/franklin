import React from 'react';
import Immutable from 'immutable';

import AnnotationForm from '../AnnotationForm';
import Labels from '../Labels';
import Search from '../Search';
import Exons from '../Exons';

const Toolbar = (props) => (
  <div className="toolbar">
    <div className="sequence-panel">
      <h4>Sequence</h4>
      <p>{props.name}</p>
    </div>

    <Search
      ntSequence={props.ntSequence}
    />

    <div className="exon-panel">
      <h4>Exons</h4>
      <Exons {...props} />
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
  ntSequence: React.PropTypes.object,
};

export default Toolbar;
