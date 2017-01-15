import React, { PropTypes } from 'react';

const { string } = PropTypes;


const Footer = props =>
  <footer className="main">
    <div className="version">
      <span className="git-ref">
        <i className="fa fa-code-fork" />&nbsp;{props.version}
      </span>
    </div>

    <div className="credits">
      By the good folks at&nbsp;
      <a
        href="https://tailordev.fr"
        title="Read more about us"
        target="_blank"
        rel="noopener noreferrer"
      >
        TailorDev
      </a>, 2016.
    </div>
  </footer>
  ;

Footer.propTypes = {
  version: string.isRequired,
};

export default Footer;
