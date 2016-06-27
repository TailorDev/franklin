import { expect } from 'chai';
import Immutable from 'immutable';
import reducer, * as actions from '../sequence';

// see: https://github.com/mochajs/mocha/issues/1847
const { describe, it } = global;


describe('modules/sequence', () => {
  it('should return the initial state', () => {
    const state = reducer(undefined, {});

    expect(state.sequence).to.be.defined;
    expect(state.positionFrom).to.be.defined;
  });
});
