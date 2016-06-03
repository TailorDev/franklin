import React, { Component, PropTypes } from 'react';
import { Events } from '../Store';


export default class Loader extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = { loading: false };
  }

  componentDidMount() {
    this.context.controller.on(Events.LOADING_START, () => {
      this.setState({ loading: true });
    });
    this.context.controller.on(Events.LOADING_END, () => {
      this.setState({ loading: false });
    });
  }

  render() {
    return this.state.loading ?
      <div className="loader">
        <p className="message">
          Rendering your sequence...<br /><br />
          <i className="fa fa-spinner fa-pulse fa-2x fa-fw"></i>
        </p>
      </div>
      :
      null;
  }
}

Loader.contextTypes = {
  controller: PropTypes.object.isRequired,
};
