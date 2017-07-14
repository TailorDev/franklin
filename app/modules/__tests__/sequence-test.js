import { expect } from 'chai';
import Immutable from 'immutable';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import reducer, * as actions from '../sequence';
import { defaultSequence } from '../../defaults';

// see: https://github.com/mochajs/mocha/issues/1847
const { describe, it } = global;

describe('modules/sequence', () => {
  const middlewares = [thunk];
  const mockStore = configureMockStore(middlewares);

  it('should return the initial state', () => {
    const state = reducer(undefined, {});

    expect(state).to.have.all.keys([
      'sequence',
      'positionFrom',
      'loading',
      'name',
    ]);
    expect(state.sequence).not.to.be.undefined;
    expect(state.positionFrom).not.to.be.undefined;
    expect(state.loading).not.to.be.undefined;
  });

  it('handles LOAD_DEFAULT', () => {
    const state = reducer(undefined, actions.loadDefaultSequence());

    expect(state).to.have.all.keys([
      'sequence',
      'positionFrom',
      'loading',
      'name',
    ]);

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

  it('handles CHANGE_POSITION_FROM', () => {
    const state = reducer(undefined, actions.changePositionFrom(1234));

    expect(state).to.have.all.keys([
      'sequence',
      'positionFrom',
      'loading',
      'name',
    ]);

    expect(state.positionFrom).to.equal(1234);
  });

  it('handles empty file', () => {
    const store = mockStore({});
    const content = {
      header: '',
      sequence: Immutable.List(),
    };

    const { header, sequence } = actions.checkUploadedFile(
      store.dispatch,
      content
    );
    expect(header).to.equal('');
    expect(store.getActions()[0].type).to.equal('franklin/notification/NOTIFY');
    expect(store.getActions()[0].level).to.equal('error');
  });

  it('handles empty header', () => {
    const store = mockStore({});
    const content = {
      header: '',
      sequence: Immutable.List(['A', 'G']),
    };

    const { header, sequence } = actions.checkUploadedFile(
      store.dispatch,
      content
    );
    expect(header).to.equal('Unknown');
    expect(store.getActions()[0].type).to.equal('franklin/notification/NOTIFY');
    expect(store.getActions()[0].level).to.equal('warning');
    expect(store.getActions()[0].message).to.equal(
      'Undefined title set to unknown'
    );
  });

  it('handles empty sequence file', () => {
    const store = mockStore({});
    const content = {
      header: 'name',
      sequence: Immutable.List([]),
    };

    const { header, sequence } = actions.checkUploadedFile(
      store.dispatch,
      content
    );
    expect(header).to.equal('name');
    expect(store.getActions()[0].type).to.equal('franklin/notification/NOTIFY');
    expect(store.getActions()[0].level).to.equal('error');
    expect(store.getActions()[0].message).to.equal(
      'No sequence found into the file'
    );
  });

  it('should close "upload" notifications when uploaded file is OK', () => {
    const store = mockStore({});
    const content = {
      header: 'name',
      sequence: Immutable.List(['A', 'G']),
    };

    const { header, sequence } = actions.checkUploadedFile(
      store.dispatch,
      content
    );
    expect(header).to.equal('name');
    expect(store.getActions()[0].type).to.equal(
      'franklin/notification/CLOSE_CATEGORY'
    );
  });
});
