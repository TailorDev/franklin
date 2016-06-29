import React from 'react';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';

// see: https://github.com/mochajs/mocha/issues/1847
const { describe, it } = global;

import ExonForm from '../ExonForm';


describe('<ExonForm />', () => {

  it('renders an exon form', () => {
    const wrapper = shallow(
      <ExonForm
        onCancel={() => {}}
      />
    );
    expect(wrapper.find('input[type="number"]')).to.have.length(2);
    expect(wrapper.find('input[type="text"]')).to.have.length(1);
    expect(wrapper.find('input[type="submit"]')).to.have.length(1);
    expect(wrapper.find('input[type="reset"]')).to.have.length(1);
  });

  it('renders an new empty exon form', () => {
    const wrapper = shallow(
      <ExonForm
        onCancel={() => {}}
      />
    );
    expect(wrapper.find('input[type="number"]').get(0).props.value.length).to.equal(0);
    expect(wrapper.find('input[type="number"]').get(1).props.value.length).to.equal(0);
    expect(wrapper.find('input[type="text"]').get(0).props.value.length).to.equal(0);
  });

  it('cancels exon form display', () => {
    const spy = sinon.spy();
    const wrapper = shallow(
      <ExonForm
        onCancel={spy}
      />
    );

    wrapper.find('input[type="reset"]').simulate('click');
    expect(spy.calledOnce).to.be.true;
  });


  it('submits exon creation form', () => {
    const spy = sinon.spy();
    const wrapper = shallow(
      <ExonForm
        onCreateNewExon={spy}
        onCancel={() => {}}
      />
    );

    wrapper.find('input[type="number"]').at(0).simulate('change', {
      persist: () => {},
      target: {
        value: 10
      }
    });
    wrapper.find('input[type="number"]').at(1).simulate('change', {
      persist: () => {},
      target: {
        value: 20
      }
    });
    wrapper.find('input[type="text"]').simulate('change', {
      persist: () => {},
      target: {
        value: 'Exon 1'
      }
    });
    wrapper.find('input[type="submit"]').simulate('click');
    expect(spy.calledOnce).to.be.true;
  });
});
