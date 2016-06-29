import React, { PropTypes } from 'react';

const Search = (props) => (
  <div className="search">
    <input
      type="text"
      placeholder="ATCG..."
      value={props.value}
      onChange={props.onChange}
      disabled={null === props.ntSequence}
    />
    {props.value.length ?
      <div className={`matches${0 === props.matches ? ' none' : ''}`}>
        <span>{props.matches}</span> match{1 < props.matches ? 'es' : null}
      </div>
      :
      null
    }
  </div>
);

Search.propTypes = {
  onChange: PropTypes.func.isRequired,
  ntSequence: PropTypes.object,
  value: PropTypes.string.isRequired,
  matches: PropTypes.number.isRequired,
};

export default Search;
