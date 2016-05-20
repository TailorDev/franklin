import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';

// see: https://github.com/mochajs/mocha/issues/1847
const { describe, it } = global;

import Nucleotide from '../Nucleotide';

describe('<Nucleotide />', () => {

  it('renders a Nucleotide as needed', () => {
    const wrapper = mount(
      <Nucleotide
        x={5}
        y={30}
        type="A"
        position={20}
        isSelected={false}
        isInSelectionRange={false}
        onClick={() => {}}
      />
    );

    const instance = wrapper.instance();
    expect(wrapper.find(Nucleotide)).to.have.length(1);
    expect(instance.props.x).to.equal(5);
    expect(instance.props.y).to.equal(30);
    expect(instance.props.type).to.equal("A");
    expect(instance.props.position).to.equal(20);
    expect(instance.props.isSelected).to.be.false;
    expect(instance.props.isInSelectionRange).to.be.false;
  });

  it('computes the position text length', () => {
    let wrapper = mount(
      <Nucleotide
        x={5}
        y={30}
        type="A"
        position={230}
        isSelected={false}
        isInSelectionRange={false}
        onClick={() => {}}
      />
    );
    let instance = wrapper.instance();
    expect(instance.getPositionLength()).to.equal(3);

    wrapper = mount(
      <Nucleotide
        x={5}
        y={30}
        type="A"
        position={230123}
        isSelected={false}
        isInSelectionRange={false}
        onClick={() => {}}
      />
    );
    instance = wrapper.instance();
    expect(instance.getPositionLength()).to.equal(6);
  });

  it('computes the position background x-coordinate', () => {
    let wrapper = mount(
      <Nucleotide
        x={5}
        y={30}
        type="A"
        position={230}
        isSelected={false}
        isInSelectionRange={false}
        onClick={() => {}}
      />
    );
    let instance = wrapper.instance();
    expect(instance.getPositionBackgroundXCoordinate()).to.equal(-10);

    wrapper = mount(
      <Nucleotide
        x={5}
        y={30}
        type="A"
        position={230123}
        isSelected={false}
        isInSelectionRange={false}
        onClick={() => {}}
      />
    );
    instance = wrapper.instance();
    expect(instance.getPositionBackgroundXCoordinate()).to.equal(-25);
  });

  it('computes the position background width', () => {
    let wrapper = mount(
      <Nucleotide
        x={5}
        y={30}
        type="A"
        position={230}
        isSelected={false}
        isInSelectionRange={false}
        onClick={() => {}}
      />
    );
    let instance = wrapper.instance();
    expect(instance.getPositionBackgroundWidth()).to.equal(40);

    wrapper = mount(
      <Nucleotide
        x={5}
        y={30}
        type="A"
        position={230123}
        isSelected={false}
        isInSelectionRange={false}
        onClick={() => {}}
      />
    );
    instance = wrapper.instance();
    expect(instance.getPositionBackgroundWidth()).to.equal(70);
  });

  it('computes the position text x-coordinate', () => {
    let wrapper = mount(
      <Nucleotide
        x={5}
        y={30}
        type="A"
        position={230}
        isSelected={false}
        isInSelectionRange={false}
        onClick={() => {}}
      />
    );
    let instance = wrapper.instance();
    expect(instance.getPositionTextXCoordinate()).to.equal(-5);

    wrapper = mount(
      <Nucleotide
        x={5}
        y={30}
        type="A"
        position={230123}
        isSelected={false}
        isInSelectionRange={false}
        onClick={() => {}}
      />
    );
    instance = wrapper.instance();
    expect(instance.getPositionTextXCoordinate()).to.equal(-20);
  });
});
