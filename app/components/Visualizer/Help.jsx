import React from 'react';


const Help = ({ onFileSelectClick }) =>
  <div className="help">
    <h4>Drag &amp; drop your sequence file here</h4>

    <p className="message">
      Your file will be loaded locally (in your web browser), nothing
      will be uploaded to our servers.
    </p>

    <i className="fa fa-file big" aria-hidden="true"></i>
    <i className="fa fa-arrow-right big" aria-hidden="true"></i>
    <i className="fa fa-square-o big" aria-hidden="true"></i>

    <div>
      <h4>Or click below to select your file</h4>

      <button
        className="button"
        onClick={onFileSelectClick}
      >
        Select file
      </button>
    </div>

    <p>
      Your FASTA file content must look like the following:
    </p>

    <pre>
        >gi|671162122:c7086083-7083225 Drosophila melanogaster chromosome 3R{'\n'}
        ATGGTCACTCTAATCGCAGTCTGCAATTTACGTGTTTCCAACTTAACGCCCCCAAGTTAATAGCCGTAAT{'\n'}
        CATTTGAAAAGAAAGGCACGCACGCACAACGCCATGCGGATCGAACCTGGGGACTCCTTTTGGACGAAAA{'\n'}
        AGGCGATGTTTTCCAACGCAGAAAGGCAGTACTTTGAGACGGTCCGTCCGCGGAAGACCAGTGTGAGTAA{'\n'}
        AAGTTGACCGTCGATGGCGATTTCACAAGTGACGTTTAAGTGGCGGGAACTTCTACTCACAAATCCCTGA{'\n'}
        GCCCTGTGATATGATTTATTTTATGGAGCCGTGATCCGGACGAAAAATGCACACACATTTCTACAAAAAT{'\n'}
        ATGTACATCGCGGTGCGATTGTGTCGCTTAAAGCACACGTACACCCACTGTCACACTCACACTCACATGC{'\n'}
    </pre>
  </div>
;

Help.propTypes = {
  onFileSelectClick: React.PropTypes.func.isRequired,
};

export default Help;
