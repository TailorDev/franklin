import React, { PropTypes, Component } from 'react';
import Immutable from 'immutable';

import Exon from './Exon';
import ExonForm from './ExonForm';

const { func, instanceOf } = PropTypes;


class Exons extends Component {

  constructor(props, context) {
    super(props, context);

    this.state = { displayNewExonForm: false };

    this.onCreateNewExon = this.onCreateNewExon.bind(this);
    this.toggleNewExonForm = this.toggleNewExonForm.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.props.exons !== nextProps.exons ||
      this.state.displayNewExonForm !== nextState.displayNewExonForm;
  }

  onCreateNewExon(exon) {
    this.props.onCreateNewExon(exon);
    this.toggleNewExonForm();
  }

  toggleNewExonForm() {
    this.setState({
      displayNewExonForm: !this.state.displayNewExonForm,
    });
  }

  render() {
    return (
      <div className="exons">
        {/* Edit exons */}
        {this.props.exons.map((exon, index) =>
          <Exon
            key={index}
            index={index}
            exon={exon}
            onEditExon={this.props.onEditExon}
            onRemoveExon={this.props.onRemoveExon}
          />,
        )}
        {/* New exon */}
        <div className="new">
          {this.state.displayNewExonForm ?
            <ExonForm
              key="new"
              onCancel={this.toggleNewExonForm}
              onCreateNewExon={this.props.onCreateNewExon}
            />
            :
            <button
              className="button new-exon"
              onClick={this.toggleNewExonForm}
            >
                New Exon
              </button>
          }
        </div>
      </div>
    );
  }
}

Exons.propTypes = {
  exons: instanceOf(Immutable.List).isRequired,
  onEditExon: func.isRequired,
  onRemoveExon: func.isRequired,
  onCreateNewExon: func.isRequired,
};

export default Exons;
