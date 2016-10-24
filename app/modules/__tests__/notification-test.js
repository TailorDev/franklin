import { expect } from 'chai';
import reducer, * as actions from '../notification';

// see: https://github.com/mochajs/mocha/issues/1847
const { describe, it } = global;


describe('modules/notification', () => {
  it('should return the initial state', () => {
    const state = reducer(undefined, {});

    expect(state).to.have.all.keys([
      'messages',
    ]);
    expect(state.messages).to.be.empty;
  });

  it('should register new notifications', () => {
    const state = reducer(undefined, actions.notify('hello', 'info'));

    expect(state.messages).to.have.length(1);
  });

  it('should avoid duplicated similar notifications', () => {
    let state = reducer(undefined, {});

    state = reducer(state, actions.notify('hello', 'info'));
    state = reducer(state, actions.notify('oops', 'error'));
    state = reducer(state, actions.notify('hello', 'info'));

    expect(state.messages).to.have.length(2);
    expect(state.messages[0].count).to.equal(2);
    expect(state.messages[0].content).to.equal('hello');
    expect(state.messages[1].count).to.equal(1);
  });

  it('should close a notification', () => {
    let state = reducer(undefined, actions.notify('hello', 'info'));

    state = reducer(state, actions.close(0));

    expect(state.messages).to.have.length(0);
  });

  it('should notify "info" messages to the user', () => {
    const state = reducer(undefined, actions.info('hello'));

    expect(state.messages[0].level).to.equal('info');
  });

  it('should notify "error" messages to the user', () => {
    const state = reducer(undefined, actions.error('hello'));

    expect(state.messages[0].level).to.equal('error');
  });

  it('should notify "warning" messages to the user', () => {
    const state = reducer(undefined, actions.warning('hello'));

    expect(state.messages[0].level).to.equal('warning');
  });

  it('should close notifications by category', () => {
    let state = reducer(undefined, {});

    state = reducer(state, actions.notify('Warning', 'warning', 'upload'));
    state = reducer(state, actions.notify('hello', 'info'));
    state = reducer(state, actions.notify('Fail', 'error', 'upload'));
    state = reducer(state, actions.error('Fail', 'upload'));

    state = reducer(state, actions.closeCategory('upload'));

    expect(state.messages).to.have.length(1);
    expect(state.messages[0].content).to.equal('hello');
  });

  it('should close all notifications', () => {
    let state = reducer(undefined, {});

    state = reducer(state, actions.notify('hello', 'info'));
    state = reducer(state, actions.notify('Fail', 'error', 'upload'));

    state = reducer(state, actions.closeAll());

    expect(state.messages).to.have.length(0);
  });
});
