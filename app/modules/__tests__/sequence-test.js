import { expect } from 'chai';
import Immutable from 'immutable';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import reducer, * as actions from '../sequence';
import { defaultSequence } from '../../defaults';

// see: https://github.com/mochajs/mocha/issues/1847
const { describe, it } = global;


describe('modules/sequence', () => {
  const middlewares = [ thunk ];
  const mockStore = configureMockStore(middlewares);

  it('should return the initial state', () => {
    const state = reducer(undefined, {});

    expect(state.sequence).not.to.be.undefined;
    expect(state.positionFrom).not.to.be.undefined;
    expect(state.loading).not.to.be.undefined;
  });

  it('handles LOAD_DEFAULT', () => {
    const state = reducer(undefined, actions.loadDefaultSequence());

    expect(state.sequence).not.to.be.undefined;
    expect(state.positionFrom).not.to.be.undefined;
    expect(state.loading).not.to.be.undefined;

    expect(state.sequence).to.equal(defaultSequence);
    expect(state.loading).to.be.false;
  });

  it('handles LOAD_FILE', () => {
    const store = mockStore({});

    store.dispatch(actions.loadFile('file'));
    expect(store.getActions()[0].type).to.equal('franklin/sequence/LOAD_FILE');
    // TODO: we should expect SEQUENCE_LOADED at some point...
  });
});
