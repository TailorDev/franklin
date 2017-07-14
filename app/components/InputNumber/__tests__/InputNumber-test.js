import React from 'react';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';

// see: https://github.com/mochajs/mocha/issues/1847
const { describe, it } = global;

import InputNumber from '../';

describe('<InputNumber />', () => {
  it('renders itself', () => {
    const wrapper = mount(
      <InputNumber
        value={124}
        min={1}
        placeholder={'From'}
        onChange={() => {}}
        isDisabled={false}
      />
    );

    expect(wrapper.find('input')).to.have.length(1);
    expect(wrapper.find('label').is('.is-invalid-label')).to.be.false;
    expect(wrapper.find('small').is('.is-visible')).to.be.false;
    expect(wrapper.find('input').prop('disabled')).to.be.false;
  });

  it('can be disabled', () => {
    const wrapper = mount(
      <InputNumber
        value={124}
        min={1}
        placeholder={'From'}
        onChange={() => {}}
        isDisabled
      />
    );

    expect(wrapper.find('input').prop('disabled')).to.be.true;
  });

  it('should know when it is invalid', () => {
    const wrapper = shallow(
      <InputNumber
        value={124}
        min={200}
        placeholder={'From'}
        onChange={() => {}}
        isDisabled={false}
      />
    );

    expect(wrapper.find('label').is('.is-invalid-label')).to.be.true;
    expect(wrapper.find('small').is('.is-visible')).to.be.true;
  });

  it('should NOT be invalid when no value is supplied', () => {
    const wrapper = shallow(
      <InputNumber
        value={''}
        min={200}
        placeholder={'From'}
        onChange={() => {}}
        isDisabled={false}
      />
    );

    expect(wrapper.find('label').is('.is-invalid-label')).to.be.false;
    expect(wrapper.find('small').is('.is-visible')).to.be.false;
  });
});
