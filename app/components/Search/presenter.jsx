import React, { PropTypes } from 'react';

const Search = (props) => (
  <div className="search-panel">
    <h4>Search</h4>
    <input
      type="text"
      placeholder="ATCG..."
      value={props.value}
      onChange={props.onChange}
      disabled={null === props.ntSequence}
    />
  </div>
);

Search.propTypes = {
  onChange: PropTypes.func.isRequired,
  ntSequence: PropTypes.object,
  value: PropTypes.string.isRequired,
};

export default Search;