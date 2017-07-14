import PropTypes from 'prop-types';
import React from 'react';

const Search = props => (
  <div className="search">
    <label htmlFor="search-help-input">
      <input
        type="text"
        placeholder="ATCG..."
        value={props.value}
        onChange={props.onChange}
        disabled={null === props.ntSequence}
        aria-describedby="search-help"
        name="search-help-input"
      />
    </label>
    <p className="help-text" id="search-help">
      <a href="https://en.wikipedia.org/wiki/Nucleic_acid_notation#IUPAC_notation">
        IUPAC notation
      </a> is supported.
    </p>
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

Search.defaultProps = {
  ntSequence: null,
};

export default Search;
