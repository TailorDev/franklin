import { connect } from 'react-redux';
import Notifications from './presenter';
import { close } from '../../modules/notification';

const mapStateToProps = state => {
  const notification = state.notification;

  return {
    messages: notification.messages,
  };
};

const mapDispatchToProps = dispatch => ({
  onMessageBoxClose: index => {
    dispatch(close(index));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
