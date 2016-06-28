import React, { PropTypes } from 'react';
import Immutable from 'immutable';

import ExonForm from './ExonForm';

const { func, instanceOf } = PropTypes;


const ExonForms = (props) => (
  <div className="exons">
    {/* Edit exons */}
    {props.exons.map((exon, index) =>
      <ExonForm
        key={index}
        exon={exon}
        onEditExon={(editedExon) => { props.onEditExon(index, editedExon); }}
        onRemoveExon={() => { props.onRemoveExon(index); }}
      />
    )}
    {/* New exon */}
    <ExonForm
      key="new"
      onCreateNewExon={(newExon) => { props.onCreateNewExon(newExon); }}
    />
  </div>
);

ExonForms.propTypes = {
  exons: instanceOf(Immutable.List).isRequired,
  onEditExon: func.isRequired,
  onRemoveExon: func.isRequired,
  onCreateNewExon: func.isRequired,
};

export default ExonForms;
