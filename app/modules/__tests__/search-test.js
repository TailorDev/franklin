import { expect } from 'chai';
import reducer, * as actions from '../search';

// see: https://github.com/mochajs/mocha/issues/1847
const { describe, it } = global;

describe('modules/search', () => {
  it('should return the initial state', () => {
    const state = reducer(undefined, {});

    expect(state).to.contain({
      value: '',
      matches: 0,
    });
  });

  it('should handle SEARCH', () => {
    const state = reducer(undefined, actions.search('foo', 0));

    expect(state).to.contain({
      value: 'foo',
      matches: 0,
    });
  });

  it('should handle CLEAR', () => {
    let state = reducer(undefined, actions.search('foo', 0));

    expect(state).to.contain({
      value: 'foo',
      matches: 0,
    });

    state = reducer(state, actions.clear());

    expect(state).to.contain({
      value: '',
      matches: 0,
    });
  });
});
