import React from 'react';


export default () => (
  <div className="toolbar">
    <div>
      <h4>Annotations</h4>

      <ul className="annotations">
        <li className="annotation"><span className="primer">&nbsp;</span> Primer</li>
        <li className="annotation"><span className="snp">&nbsp;</span> SNP</li>
        <li className="annotation inactive"><span className="lambda">&nbsp;</span> Lambda</li>
        <li className="annotation new"><span className="new">+</span> Add new</li>
      </ul>
    </div>

    <div className="search">
      <h4>Search</h4>

      <input type="text" id="search" placeholder="type your pattern here" />
    </div>

    <div className="export">
      <h4>Export</h4>

      <button>Download SVG</button>
    </div>
  </div>
);
