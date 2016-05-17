import React from 'react';

import Labels from './Labels';

export default () =>
  <div className="toolbar">
    <div>
      <h4>Annotations</h4>
      <Labels />
    </div>

    <div className="search">
      <h4>Search</h4>

      <input type="text" id="search" placeholder="type your pattern here" />
    </div>

    <div className="export">
      <h4>Export</h4>

      <button className="button">Download SVG</button>
    </div>
  </div>
;
