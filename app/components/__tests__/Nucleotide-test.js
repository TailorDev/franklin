import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';
import Immutable from 'immutable';

// see: https://github.com/mochajs/mocha/issues/1847
const { describe, it } = global;

import Nucleotide from '../Nucleotide/presenter';
import { mapStateToProps } from '../Nucleotide';

describe('<Nucleotide />', () => {
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
        isSelected={false}
        isInSelectionRange={false}
        isInExon={false}
      />
    );

    const instance = wrapper.instance();
    expect(wrapper.find(Nucleotide)).to.have.length(1);
    expect(instance.state.x).to.equal(10);
    expect(instance.state.y).to.equal(10);
    expect(instance.props.type).to.equal("A");
    expect(instance.props.position).to.equal(1);
    expect(instance.props.isSelected).to.be.false;
    expect(instance.props.isInSelectionRange).to.be.false;
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
        isSelected={false}
        isInSelectionRange={false}
        isInExon={false}
      />
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
        isSelected={false}
        isInSelectionRange={false}
        isInExon={false}
        onClick={() => {}}
      />
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
        isSelected={false}
        isInSelectionRange={false}
        isInExon={false}
        onClick={() => {}}
      />
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
        isSelected={false}
        isInSelectionRange={false}
        isInExon={false}
      />
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
        isSelected={false}
        isInSelectionRange={false}
        isInExon={false}
      />
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
        isSelected={false}
        isInSelectionRange={false}
        isInExon={false}
      />
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
        isSelected={false}
        isInSelectionRange={false}
        isInExon={false}
      />
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
        isSelected={false}
        isInSelectionRange={false}
        isInExon={false}
      />
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
        isSelected={false}
        isInSelectionRange={false}
        isInExon={false}
      />
    );
    instance = wrapper.instance();
    expect(instance.getPositionTextXCoordinate()).to.equal(-20);
  });

  describe('mapStateToProps', () => {
    it('returns false if no selection', () => {
      const state = {
        selection: {
          selections: [],
        },
        exon: { exons: new Immutable.List() },
      };
      const ownProps = { index: 1 };
      const props = mapStateToProps(state, ownProps);

      expect(props.isSelected).to.be.false;
      expect(props.isInSelectionRange).to.be.false;
    });

    it('returns isInSelectionRange but !isSelected', () => {
      const state = {
        selection: {
          selections: [{ from: 0, to: 2}],
        },
        exon: { exons: new Immutable.List() },
      };
      const ownProps = { index: 1 };
      const props = mapStateToProps(state, ownProps);

      expect(props.isSelected).to.be.false;
      expect(props.isInSelectionRange).to.be.true;
    });

    it('returns isInSelectionRange and isSelected', () => {
      const state = {
        selection: {
          selections: [{ from: 1, to: 2}],
        },
        exon: { exons: new Immutable.List() },
      };
      const ownProps = { index: 1 };
      const props = mapStateToProps(state, ownProps);

      expect(props.isSelected).to.be.true;
      expect(props.isInSelectionRange).to.be.true;
    });

    it('returns isInSelectionRange and isSelected with multiple selections', () => {
      const state = {
        selection: {
          selections: [{ from: 10, to: 20}],
          selections: [{ from: 1, to: 2}],
        },
        exon: { exons: new Immutable.List() },
      };
      const ownProps = { index: 2 };
      const props = mapStateToProps(state, ownProps);

      expect(props.isSelected).to.be.true;
      expect(props.isInSelectionRange).to.be.true;
    });

    it('returns isInSelectionRange and isSelected with inverted selections', () => {
      const state = {
        selection: {
          selections: [{ from: 10, to: 2}],
        },
        exon: { exons: new Immutable.List() },
      };
      const ownProps = { index: 8 };
      const props = mapStateToProps(state, ownProps);

      expect(props.isSelected).to.be.false;
      expect(props.isInSelectionRange).to.be.true;
    });
  });
});
