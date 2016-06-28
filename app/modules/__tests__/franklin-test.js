import { expect } from 'chai';
import Immutable from 'immutable';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from '../franklin';
import { defaultfranklins } from '../../defaults';

// see: https://github.com/mochajs/mocha/issues/1847
const { describe, it } = global;


describe('modules/franklin', () => {
  const middlewares = [ thunk ];
  const mockStore = configureMockStore(middlewares);

  it('calls the default load actions', () => {
    const expectedActions = [
      { type: 'franklin/sequence/LOAD_DEFAULT' },
      { type: 'franklin/label/LOAD_DEFAULT' },
    ];
    const store = mockStore({});

    store.dispatch(actions.loadDefault());
    expect(store.getActions()).to.deep.equal(expectedActions);
  });

  it('calls all actions needed to load a file', () => {
    const expectedActions = [
      { type: 'franklin/sequence/LOAD_FILE' },
      { type: 'franklin/label/LOAD_EMPTY' },
    ];
    const store = mockStore({});

    store.dispatch(actions.loadFile('file'));
    expect(store.getActions()).to.deep.equal(expectedActions);
  });

  it('calls all actions needed to clear', () => {
    const expectedActions = [
      { type: 'franklin/selection/CLEAR' },
      { type: 'franklin/label/CLEAR_SELECTED_ANNOTATION' },
      { type: 'franklin/search/CLEAR' },
    ];
    const store = mockStore({});

    store.dispatch(actions.clear());
    expect(store.getActions()).to.deep.equal(expectedActions);
  });
});
