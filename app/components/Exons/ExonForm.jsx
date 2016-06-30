import React, { PropTypes, Component } from 'react';

import Remove from '../Remove';

const { func, object } = PropTypes;

const defaultExon = {
  name: '',
  positionFrom: '',
  positionTo: '',
};


class ExonForm extends Component {
  constructor(props, context) {
    super(props, context);

    let exon = defaultExon;

    if (props.exon) {
      exon = props.exon;
    }

    this.state = {
      exon,
      displayRemoveForm: false,
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.toggleActionRemove = this.toggleActionRemove.bind(this);
    this.onPositionFromChange = this.onPositionFromChange.bind(this);
    this.onPositionToChange = this.onPositionToChange.bind(this);
    this.onNameChange = this.onNameChange.bind(this);
  }

  onSubmit(event) {
    if (event) {
      event.preventDefault();
    }

    // Prevent empty fields
    if (
      !this.state.exon.name.length ||
      !this.state.exon.positionFrom ||
      !this.state.exon.positionTo
    ) {
      return;
    }

    if (this.props.onCreateNewExon) {
      // Create a new exon
      this.props.onCreateNewExon(this.state.exon);
      this.setState({ exon: defaultExon });
    } else if (this.props.onEditExon) {
      // Edit an exon
      this.props.onEditExon(this.state.exon);
    }
  }

  onPositionFromChange(event) {
    this.setState({
      exon: {
        name: this.state.exon.name,
        positionFrom: event.target.value,
        positionTo: this.state.exon.positionTo,
      },
      displayRemoveForm: this.state.displayRemoveForm,
    });
  }

  onPositionToChange(event) {
    this.setState({
      exon: {
        name: this.state.exon.name,
        positionFrom: this.state.exon.positionFrom,
        positionTo: event.target.value,
      },
      displayRemoveForm: this.state.displayRemoveForm,
    });
  }

  onNameChange(event) {
    this.setState({
      exon: {
        name: event.target.value,
        positionFrom: this.state.exon.positionFrom,
        positionTo: this.state.exon.positionTo,
      },
      displayRemoveForm: this.state.displayRemoveForm,
    });
  }

  onCancel() {
    this.props.onCancel();
  }

  toggleActionRemove(event) {
    event.preventDefault();
    this.setState({ displayRemoveForm: !this.state.displayRemoveForm });
  }

  render() {
    return (
      <div className="exon-form-wrapper">
        <form onSubmit={this.onSubmit}>
          <input
            type="number"
            value={this.state.exon.positionFrom}
            placeholder="From"
            onChange={this.onPositionFromChange}
          />
          <input
            type="number"
            value={this.state.exon.positionTo}
            placeholder="To"
            onChange={this.onPositionToChange}
          />
          <input
            type="text"
            value={this.state.exon.name}
            placeholder="Name"
            onChange={this.onNameChange}
          />
          <div className="action-buttons">
            <input
              type="submit"
              value={this.props.onEditExon ? 'Save' : 'Add'}
              className="button submit"
              onClick={this.onSubmit}
            />
            {this.props.onRemoveExon ?
              <button
                className="button remove"
                onClick={this.toggleActionRemove}
              >
                <i className="fa fa-trash-o" aria-hidden="true"></i>
              </button>
              :
              null
            }
            <input
              type="reset"
              value="Cancel"
              className="button cancel"
              onClick={this.onCancel}
            />
          </div>
        </form>
        {this.state.displayRemoveForm ?
          <Remove
            onRemove={this.props.onRemoveExon}
            onCancel={this.toggleActionRemove}
          >
            Are you sure you want to remove this exon?
          </Remove> : null
        }
      </div>
    );
  }
}

ExonForm.propTypes = {
  onEditExon: func,
  onCancel: func.isRequired,
  onRemoveExon: func,
  onCreateNewExon: func,
  exon: object,
};

export default ExonForm;
