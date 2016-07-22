import React from 'react';

import InputNumber from '../InputNumber';

class PositionFrom extends React.Component {

  shouldComponentUpdate(nextProps) {
    return this.props.value !== nextProps.value;
  }

  render() {
    return (
      <InputNumber
        value={this.props.value}
        onChange={this.props.onChange}
        labelText={'Starting position'}
        min={1}
      />
    );
  }
}

PositionFrom.propTypes = {
  value: React.PropTypes.number.isRequired,
  onChange: React.PropTypes.func.isRequired,
};

export default PositionFrom;
