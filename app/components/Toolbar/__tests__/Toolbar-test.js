import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import Immutable from 'immutable';
import sinon from 'sinon';

// see: https://github.com/mochajs/mocha/issues/1847
const { describe, it } = global;

import Toolbar from '../presenter';
import { mapStateToProps } from '../index';


describe('<Toolbar />', () => {

  const list = new Immutable.List();

  it('renders a panel', () => {
    const wrapper = shallow(
      <Toolbar
        name={''}
        sequence={list}
        labels={list}
        positionFrom={1}
        onPositionFromChange={() => {}}
      />
    );

    expect(wrapper.find('.toolbar')).to.have.length(1);
  });

  it('display the sequence name', () => {
    const wrapper = shallow(
      <Toolbar
        name={'NC_004350.2'}
        sequence={list}
        labels={list}
        positionFrom={1}
        onPositionFromChange={() => {}}
      />
    );

    expect(wrapper.find('.sequence-panel')).to.have.length(1);
    expect(wrapper.find('.sequence-panel').text()).to.contain('NC_004350.2');
  });

  it('should hide the clear selection button', () => {
    const wrapper = shallow(
      <Toolbar
        name={'NC_004350.2'}
        sequence={list}
        labels={list}
        positionFrom={1}
        onPositionFromChange={() => {}}
        hasSelection={false}
      />
    );

    expect(wrapper.find('.clear-selection').hasClass('hidden')).to.equal(true);
  })

  it('should show the clear selection button', () => {
    const wrapper = shallow(
      <Toolbar
        name={'NC_004350.2'}
        sequence={list}
        labels={list}
        positionFrom={1}
        onPositionFromChange={() => {}}
        hasSelection={true}
      />
    );

    expect(wrapper.find('.clear-selection').hasClass('hidden')).to.equal(false);
  })

  it('clear the current selection', () => {
    const spy = sinon.spy();
    const wrapper = shallow(
      <Toolbar
        name={'NC_004350.2'}
        sequence={list}
        labels={list}
        positionFrom={1}
        onPositionFromChange={() => {}}
        onClearSelection={spy}
        hasSelection={true}
      />
    );

    expect(wrapper.find('.clear-selection')).to.have.length(1);
    wrapper.find('.clear-selection a').simulate('click');
    expect(spy.calledOnce).to.be.true;
  })

  describe('mapStateToProps', () => {
    it('should return a null ntSequence when sequence is empty', () => {
      const state = {
        sequence: {
          name: 'empty list',
          sequence: new Immutable.List(),
        },
        label: { labels: [] },
        exon: { exons: new Immutable.List() },
        selection: { selections: [] },
      };

      const props = mapStateToProps(state);

      expect(props.name).to.equal('empty list');
      expect(props.ntSequence).to.be.null;
    });

    it('should a valid ntSequence when sequence is NOT empty', () => {
      const state = {
        sequence: {
          name: 'empty list',
          sequence: new Immutable.List(['A', 'T']),
        },
        label: { labels: [] },
        exon: { exons: new Immutable.List() },
        selection: { selections: [] },
      };

      const props = mapStateToProps(state);

      expect(props.name).to.equal('empty list');
      expect(props.ntSequence).not.to.be.null;
      expect(props.ntSequence.sequence()).equal('AT');
    });
  });
});
