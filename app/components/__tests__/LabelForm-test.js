import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';

// see: https://github.com/mochajs/mocha/issues/1847
const { describe, it } = global;

import LabelForm from '../Labels/LabelForm';


describe('<LabelForm />', () => {

  const dummyLabel = {
    name: 'foo',
    color: '#000',
    isActive: true
  };

  it('renders a label form', () => {
    const wrapper = shallow(
      <LabelForm
        onCancel={() => {}}
      />
    );

    expect(wrapper.find('span.colorpicker-button')).to.have.length(1);
    expect(wrapper.find('input[type="text"]')).to.have.length(1);
    expect(wrapper.find('input[type="submit"]')).to.have.length(1);
    expect(wrapper.find('input[type="reset"]')).to.have.length(1);
  });

  it('renders a new label form with defaults', () => {
    const wrapper = shallow(
      <LabelForm
        onCancel={() => {}}
      />
    );
    expect(wrapper.find('input[type="text"]').get(0).props.value.length).to.equal(0);
  });

  it('renders an edit label form with initial values', () => {
    const wrapper = shallow(
      <LabelForm
        onEditLabel={() => {}}
        onCancel={() => {}}
        label={dummyLabel}
      />
    );
    expect(wrapper.find('input[type="text"]').get(0).props.value).to.equal('foo');
  });

  it('cancels label form display', () => {
    const spy = sinon.spy();
    const wrapper = shallow(
      <LabelForm
        onCancel={spy}
      />
    );

    wrapper.find('input[type="reset"]').simulate('click');
    expect(spy.calledOnce).to.be.true;
  });

  it('submits label creation form', () => {
    const spy = sinon.spy();
    const wrapper = shallow(
      <LabelForm
        onCreateNewLabel={spy}
        onCancel={() => {}}
      />
    );

    wrapper.find('input[type="text"]').simulate('change', {
      persist: () => {},
      target: {
        value: 'foo'
      }
    });
    wrapper.find('input[type="submit"]').simulate('click');
    expect(spy.calledOnce).to.be.true;
  });

  it('submits label edition form', () => {
    const spy = sinon.spy();
    const wrapper = shallow(
      <LabelForm
        onEditLabel={spy}
        onCancel={() => {}}
        label={dummyLabel}
      />
    );

    wrapper.find('input[type="text"]').simulate('change', {
      persist: () => {},
      target: {
        value: 'bar'
      }
    });
    wrapper.find('input[type="submit"]').simulate('click');
    expect(spy.calledOnce).to.be.true;
  });
});
