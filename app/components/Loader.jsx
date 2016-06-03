import React, { Component, PropTypes } from 'react';
import { Events } from '../Store';


export default class Loader extends Component {

  constructor(props, context) {
    super(props, context);

    this.state = { display: 'none' };
  }

  componentDidMount() {
    this.context.controller.on(Events.LOADING_START, () => {
      this.setState({ display: 'block' });
    });

    this.context.controller.on(Events.LOADING_END, () => {
      this.setState({ display: 'none' });
    });
  }

  render() {
    return (
      <div className="loader" style={{ display: this.state.display }}>
        <p className="message">
          Rendering your sequence...<br /><br />
          <i className="fa fa-spinner fa-pulse fa-2x fa-fw"></i>
        </p>
      </div>
    );
  }
}

Loader.contextTypes = {
  controller: PropTypes.object.isRequired,
};
