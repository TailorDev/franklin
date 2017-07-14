import { expect } from 'chai';
import Immutable from 'immutable';
import reducer, * as actions from '../exon';

// see: https://github.com/mochajs/mocha/issues/1847
const { describe, it } = global;

describe('modules/exon', () => {
  it('should return the initial state', () => {
    const state = reducer(undefined, {});

    expect(state.exons).not.to.be.undefined;
    expect(state.exons.size).to.be.empty;
  });

  it('should handle LOAD_DEFAULT', () => {
    const state = reducer(undefined, actions.loadDefaultExons());

    expect(state).to.have.all.keys('exons');
    expect(state.exons.size).to.equal(1);
  });

  it('should handle CREATE', () => {
    const state = reducer(
      undefined,
      actions.create({
        name: 'exon 1',
        positionFrom: 10,
        positionTo: 20,
      })
    );

    expect(state.exons).not.to.be.undefined;
    expect(state.exons.size).to.equal(1);
    expect(state.exons.get(0).name).to.equal('exon 1');
  });

  it('should handle UPDATE_AT', () => {
    const previousState = reducer(
      undefined,
      actions.create({
        name: 'exon 1',
        positionFrom: 10,
        positionTo: 20,
      })
    );
    const state = reducer(
      previousState,
      actions.updateAt(0, {
        name: 'exon 2',
        positionFrom: 10,
        positionTo: 20,
      })
    );

    expect(state.exons).not.to.be.undefined;
    expect(state.exons.size).to.equal(1);
    expect(state.exons.get(0).name).to.equal('exon 2');
  });

  it('should handle REMOVE_AT', () => {
    const previousState = reducer(
      undefined,
      actions.create({
        name: 'exon 1',
        positionFrom: 10,
        positionTo: 20,
      })
    );
    const state = reducer(previousState, actions.removeAt(0));

    expect(state.exons).not.to.be.undefined;
    expect(state.exons.size).to.be.empty;
  });
});
