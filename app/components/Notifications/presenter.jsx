/* eslint react/no-unused-prop-types: 0 */
import React, { PropTypes } from 'react';
import MessageBox from './MessageBox';


const Notifications = props => (
  <div className="message-boxes">
    {props.messages.map((message, index) =>
      <MessageBox
        index={index}
        key={index}
        message={message}
        onClose={props.onMessageBoxClose}
      />
    )}
  </div>
);

Notifications.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.shape({
    content: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
    ]).isRequired,
    level: PropTypes.string,
    count: PropTypes.number,
  })).isRequired,
  onMessageBoxClose: PropTypes.func.isRequired,
};

export default Notifications;
