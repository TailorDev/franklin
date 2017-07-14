import { connect } from 'react-redux';
import * as actions from '../../modules/exon';
import ExonForms from './presenter';

function mapStateToProps(state) {
  const exon = state.exon;

  return {
    exons: exon.exons,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onEditExon: (index, exon) => {
      dispatch(actions.updateAt(index, exon));
    },
    onRemoveExon: index => {
      dispatch(actions.removeAt(index));
    },
    onCreateNewExon: exon => {
      dispatch(actions.create(exon));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ExonForms);
