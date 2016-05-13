import React, { PropTypes } from 'react';

const { string } = PropTypes;


const Footer = (props) =>
  <footer className="main">
    <div className="version">
      <span className="git-ref">{props.version}</span>
    </div>

    <div className="credits">
      By the good folks at <a href="https://tailordev.fr" title="Read more about us" target="_blank">TailorDev</a>, 2016.
    </div>
  </footer>
;

Footer.propTypes = {
  version: string.isRequired,
};

export default Footer;
