import React, { PropTypes, Component } from 'react';

import ExonEdit from './ExonEdit';

const { number, func, object } = PropTypes;

class Exon extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      displayEditForm: false,
    };

    this.toggleActionEdit = this.toggleActionEdit.bind(this);
    this.handleEditExon = this.handleEditExon.bind(this);
    this.handleRemoveExon = this.handleRemoveExon.bind(this);
  }

  toggleActionEdit() {
    this.setState({
      displayEditForm: !this.state.displayEditForm,
    });
  }

  handleEditExon(exon) {
    this.props.onEditExon(this.props.index, exon);
    this.toggleActionEdit();
  }

  handleRemoveExon() {
    this.props.onRemoveExon(this.props.index);
    this.toggleActionEdit();
  }

  render() {
    return (
      <div
        className={
          `exon
            ${this.state.displayEditForm ? 'in-action edit' : ''}`
        }
      >
        <div
          className="properties"
          title="Click to edit"
          onClick={this.toggleActionEdit}
        >
          <span className="name">{this.props.exon.name}</span>
          <span className="position-from">{this.props.exon.positionFrom}</span>
          <span className="position-to">{this.props.exon.positionTo}</span>
        </div>

        {this.state.displayEditForm ?
          <ExonEdit
            onActionEditCancelClick={this.toggleActionEdit}
            onEditExon={this.handleEditExon}
            onRemoveExon={this.handleRemoveExon}
            exon={this.props.exon}
          /> : null
        }
      </div>
    );
  }
}

Exon.propTypes = {
  exon: object.isRequired,
  index: number.isRequired,
  onEditExon: func.isRequired,
  onRemoveExon: func.isRequired,
};

export default Exon;
