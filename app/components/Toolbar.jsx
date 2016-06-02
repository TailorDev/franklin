import React from 'react';

import Labels from './Labels';

export default (props) =>
  <div className="toolbar">
    <div className="label-panel">
      <h4>Labels</h4>
      <Labels {...props} />
    </div>
  </div>
;
