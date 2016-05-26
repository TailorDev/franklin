import React from 'react';

import Labels from './Labels';

export default (props) =>
  <div className="toolbar">
    <div className="annotation-panel">
      <h4>Annotations</h4>
      <Labels {...props} />
    </div>

    <div className="search-panel">
      <h4>Search</h4>

      <input type="text" id="search" placeholder="type your pattern here" />
    </div>

    <div className="export-panel">
      <h4>Export</h4>

      <button className="button">Download SVG</button>
    </div>
  </div>
;
