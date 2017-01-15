import React from 'react';

const Loader = props => (
  <div className="loader" style={{ display: props.display ? 'block' : 'none' }}>
    <p className="message">
      Rendering your sequence...<br /><br />
      <i className="fa fa-spinner fa-pulse fa-2x fa-fw" />
    </p>
  </div>
);

Loader.propTypes = {
  display: React.PropTypes.bool.isRequired,
};

export default Loader;
