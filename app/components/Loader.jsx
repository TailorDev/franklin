import React from 'react';
import { connect } from 'react-redux';


export const Loader = (props) => (
  <div className="loader" style={{ display: props.display ? 'block' : 'none' }}>
    <p className="message">
      Rendering your sequence...<br /><br />
      <i className="fa fa-spinner fa-pulse fa-2x fa-fw"></i>
    </p>
  </div>
);

Loader.propTypes = React.PropTypes.bool.isRequired;

function mapStateToProps(state) {
  const sequence = state.sequence;

  return {
    display: sequence.loading,
  };
}

export default connect(mapStateToProps)(Loader);
