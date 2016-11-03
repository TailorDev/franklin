import React, { PropTypes } from 'react';

const MessageBox = (props) => {
  const onClick = () => {
    props.onClose(props.index);
  };

  return (
    <div className={`message-box ${props.message.level || ''}`}>
      {1 < props.message.count ?
        <span className="badge">{props.message.count}</span> : null
      }
      <p>{props.message.content}</p>
      <button
        className="close-button"
        onClick={onClick}
      >
        <span>&times;</span>
      </button>
    </div>
  );
};

MessageBox.propTypes = {
  index: PropTypes.number.isRequired,
  message: PropTypes.shape({
    content: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
    ]).isRequired,
    level: PropTypes.string,
    count: PropTypes.number,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default MessageBox;
