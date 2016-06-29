import React, { PropTypes, Component } from 'react';

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
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onPositionFromChange = this.onPositionFromChange.bind(this);
    this.onPositionToChange = this.onPositionToChange.bind(this);
    this.onNameChange = this.onNameChange.bind(this);
  }

  onSubmit(event) {
    event.preventDefault();

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
    });
  }

  onPositionToChange(event) {
    this.setState({
      exon: {
        name: this.state.exon.name,
        positionFrom: this.state.exon.positionFrom,
        positionTo: event.target.value,
      },
    });
  }

  onNameChange(event) {
    this.setState({
      exon: {
        name: event.target.value,
        positionFrom: this.state.exon.positionFrom,
        positionTo: this.state.exon.positionTo,
      },
    });
  }

  onCancel() {
    this.props.onCancel();
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
            <input
              type="reset"
              value="Cancel"
              className="button cancel"
              onClick={this.onCancel}
            />
          </div>
        </form>
      </div>
    );
  }
}

ExonForm.propTypes = {
  onEditExon: func,
  onCancel: func.isRequired,
  onCreateNewExon: func,
  exon: object,
};

export default ExonForm;
