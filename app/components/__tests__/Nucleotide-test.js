import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';

// see: https://github.com/mochajs/mocha/issues/1847
const { describe, it } = global;

import Nucleotide from '../Nucleotide';

describe('<Nucleotide />', () => {

  let context;

  before(() => {
    context = {
      controller: {
        on: () => {}
      }
    };
  });

  it('renders a Nucleotide as needed', () => {
    const wrapper = mount(
      <Nucleotide
        visualizerMargin={{x: 10, y: 10}}
        nucleotidesPerRow={5}
        rowHeight={50}
        nucleotideWidth={12}
        index={0}
        type="A"
        position={1}
        onClick={() => {}}
      />,
      { context }
    );

    const instance = wrapper.instance();
    expect(wrapper.find(Nucleotide)).to.have.length(1);
    expect(instance.state.x).to.equal(10);
    expect(instance.state.y).to.equal(10);
    expect(instance.props.type).to.equal("A");
    expect(instance.props.position).to.equal(1);
    expect(instance.state.isSelected).to.be.false;
    expect(instance.state.isInSelectionRange).to.be.false;
  });

  it('renders multiple rows when needed', () => {
    const wrapper = mount(
      <Nucleotide
        visualizerMargin={{x: 10, y: 10}}
        nucleotidesPerRow={5}
        rowHeight={50}
        nucleotideWidth={12}
        index={5}
        type="A"
        position={6}
        onClick={() => {}}
      />,
      { context }
    );

    const instance = wrapper.instance();
    expect(instance.state.x).to.equal(10);
    expect(instance.state.y).to.equal(60);
  });

  it('computes the position text length', () => {
    let wrapper = mount(
      <Nucleotide
        visualizerMargin={{x: 10, y: 10}}
        nucleotidesPerRow={5}
        rowHeight={50}
        nucleotideWidth={12}
        type="A"
        position={230}
        index={229}
        onClick={() => {}}
      />,
      { context }
    );
    let instance = wrapper.instance();
    expect(instance.getPositionLength()).to.equal(3);

    wrapper = mount(
      <Nucleotide
        visualizerMargin={{x: 10, y: 10}}
        nucleotidesPerRow={5}
        rowHeight={50}
        nucleotideWidth={12}
        type="A"
        position={230123}
        index={230122}
        onClick={() => {}}
      />,
      { context }
    );
    instance = wrapper.instance();
    expect(instance.getPositionLength()).to.equal(6);
  });

  it('computes the position background x-coordinate', () => {
    let wrapper = mount(
      <Nucleotide
        visualizerMargin={{x: 10, y: 10}}
        nucleotidesPerRow={5}
        rowHeight={50}
        nucleotideWidth={12}
        type="A"
        position={230}
        index={229}
        onClick={() => {}}
      />,
      { context }
    );
    let instance = wrapper.instance();
    expect(instance.getPositionBackgroundXCoordinate()).to.equal(-10);

    wrapper = mount(
      <Nucleotide
        visualizerMargin={{x: 10, y: 10}}
        nucleotidesPerRow={5}
        rowHeight={50}
        nucleotideWidth={12}
        type="A"
        position={230123}
        index={230122}
        onClick={() => {}}
      />,
      { context }
    );
    instance = wrapper.instance();
    expect(instance.getPositionBackgroundXCoordinate()).to.equal(-25);
  });

  it('computes the position background width', () => {
    let wrapper = mount(
      <Nucleotide
        visualizerMargin={{x: 10, y: 10}}
        nucleotidesPerRow={5}
        rowHeight={50}
        nucleotideWidth={12}
        type="A"
        position={230}
        index={229}
        onClick={() => {}}
      />,
      { context }
    );
    let instance = wrapper.instance();
    expect(instance.getPositionBackgroundWidth()).to.equal(40);

    wrapper = mount(
      <Nucleotide
        visualizerMargin={{x: 10, y: 10}}
        nucleotidesPerRow={5}
        rowHeight={50}
        nucleotideWidth={12}
        type="A"
        position={230123}
        index={230122}
        onClick={() => {}}
      />,
      { context }
    );
    instance = wrapper.instance();
    expect(instance.getPositionBackgroundWidth()).to.equal(70);
  });

  it('computes the position text x-coordinate', () => {
    let wrapper = mount(
      <Nucleotide
        visualizerMargin={{x: 10, y: 10}}
        nucleotidesPerRow={5}
        rowHeight={50}
        nucleotideWidth={12}
        type="A"
        position={230}
        index={229}
        onClick={() => {}}
      />,
      { context }
    );
    let instance = wrapper.instance();
    expect(instance.getPositionTextXCoordinate()).to.equal(-5);

    wrapper = mount(
      <Nucleotide
        visualizerMargin={{x: 10, y: 10}}
        nucleotidesPerRow={5}
        rowHeight={50}
        nucleotideWidth={12}
        type="A"
        position={230123}
        index={230122}
        onClick={() => {}}
      />,
      { context }
    );
    instance = wrapper.instance();
    expect(instance.getPositionTextXCoordinate()).to.equal(-20);
  });
});
