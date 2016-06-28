import { expect } from 'chai';
import Immutable from 'immutable';
import reducer, * as actions from '../selection';

// see: https://github.com/mochajs/mocha/issues/1847
const { describe, it } = global;


describe('modules/selection', () => {
  it('should return the initial state', () => {
    const state = reducer(undefined, {});

    expect(state.selections).not.to.be.undefined;
    expect(state.selections).to.be.empty;
  });

  describe('CLEAR', () => {
    it('assigns from/to with undefined', () => {
      const state = reducer(undefined, actions.clear());

      expect(state.selections).not.to.be.undefined;
      expect(state.selections).to.be.empty;
    });
  });

  describe('UPDATE', () => {
    it('updates the selection', () => {
      let state;

      // not a position here, it is an index
      state = reducer(undefined, actions.update(123));

      expect(state.selections[0].from).to.equal(123);
      expect(state.selections[0].to).to.equal(undefined);

      state = reducer(state, actions.update(5));
      expect(state.selections[0].from).to.equal(5);
      expect(state.selections[0].to).to.equal(123);

      // deselect here
      state = reducer(state, actions.update(1));
      expect(state.selections[0].from).to.equal(1);
      expect(state.selections[0].to).to.equal(undefined);

      state = reducer(state, actions.update(40));
      expect(state.selections[0].from).to.equal(1);
      expect(state.selections[0].to).to.equal(40);
    });

    it('allows "unselection" by selecting on of the boundaries', () => {
      let state;

      // not a position here, it is an index
      state = reducer(undefined, actions.update(1));
      state = reducer(state, actions.update(10));

      expect(state.selections[0].from).to.equal(1);
      expect(state.selections[0].to).to.equal(10);

      state = reducer(state, actions.update(10));

      expect(state.selections).to.be.empty;
    });
  });

  describe('UPDATE_SELECTION_FROM', () => {
    it('sets the "from" value', () => {
      let state;

      state = reducer(undefined, actions.updateSelectionFrom(123));

      expect(state.selections[0].from).to.equal(123 - 1); // offset
      expect(state.selections[0].to).to.equal(undefined);

      state = reducer(undefined, actions.updateSelectionFrom(5));
      expect(state.selections[0].from).to.equal(5 - 1); // offset
    });
  });

  describe('UPDATE_SELECTION_TO', () => {
    it('sets the "to" value', () => {
      let state;

      state = reducer(undefined, actions.updateSelectionTo(123));

      expect(state.selections[0].from).to.equal(undefined);
      expect(state.selections[0].to).to.equal(123 - 1); // offset

      state = reducer(undefined, actions.updateSelectionTo(5));
      expect(state.selections[0].to).to.equal(5 - 1); // offset
    });
  });
});
