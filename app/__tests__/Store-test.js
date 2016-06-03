import Store, { Events } from '../Store';
import sinon from 'sinon';
import { expect } from 'chai';

// see: https://github.com/mochajs/mocha/issues/1847
const { Promise, beforeEach, afterEach, describe, it } = global;


describe('Store', () => {

  let eventEmitterSpy, store;

  beforeEach(() => {
    eventEmitterSpy = sinon.spy();
    store = new Store({ emit: eventEmitterSpy });
  });

  describe('labels', () => {
    describe('addNewLabel', () => {
      it ('adds the given label to its state', () => {
        expect(store.getState().labels.size).to.equal(3);

        store.addNewLabel({
          name: 'Will',
          color: '#123456',
          isActive: true,
        });

        expect(eventEmitterSpy.calledOnce).to.be.true;
        expect(eventEmitterSpy.calledWith(Events.CHANGE)).to.be.true;
        expect(store.getState().labels.size).to.equal(4);
      });
    });

    describe('updateLabelAt', () => {
      it ('updates a label at a given index', () => {
        expect(store.getState().labels.get(0).name).to.equal('Exon');

        store.updateLabelAt(0, {
          name: 'Will',
          color: '#123456',
          isActive: true,
        });

        expect(eventEmitterSpy.calledOnce).to.be.true;
        expect(eventEmitterSpy.calledWith(Events.CHANGE)).to.be.true;
        expect(store.getState().labels.get(0).name).to.equal('Will');
      });
    });

    describe('removeLabelAt', () => {
      it ('removes a label at a given index', () => {
        expect(store.getState().labels.size).to.equal(3);

        store.removeLabelAt(0);

        expect(eventEmitterSpy.calledOnce).to.be.true;
        expect(eventEmitterSpy.calledWith(Events.CHANGE)).to.be.true;
        expect(store.getState().labels.size).to.equal(2);
        expect(store.getState().labels.get(0).name).to.equal('Primer');
      });
    });

    describe('toggleLabelAt', () => {
      it ('toggles a label at a given index', () => {
        expect(store.getState().labels.get(0).isActive).to.be.true;

        store.toggleLabelAt(0);

        expect(eventEmitterSpy.calledOnce).to.be.true;
        expect(eventEmitterSpy.calledWith(Events.CHANGE)).to.be.true;
        expect(store.getState().labels.get(0).isActive).to.be.false;

        // toggle again
        store.toggleLabelAt(0);
        expect(eventEmitterSpy.calledTwice).to.be.true;
        expect(store.getState().labels.get(0).isActive).to.be.true;
      });
    });
  });

  describe('selection', () => {
    describe('updateSelection', () => {
      it('updates the selection', () => {
        store.updateSelection(2);

        expect(eventEmitterSpy.calledOnce).to.be.true;
        expect(eventEmitterSpy.calledWith(Events.CHANGE_SELECTION)).to.be.true;
        expect(store.getState().selection.size).to.equal(1);
      });

      it('restricts the selection boundaries', () => {
        expect(store.getState().selection.size).to.equal(0);

        store.updateSelection(2);
        expect(store.getState().selection.size).to.equal(1);

        store.updateSelection(3);
        expect(store.getState().selection.size).to.equal(2);

        store.updateSelection(10);
        expect(store.getState().selection.size).to.equal(2);

        store.updateSelection(1);
        expect(store.getState().selection.size).to.equal(2);
      });

      it('allows "unselection" by selecting on of the boundaries', () => {
        store.updateSelection(1);
        store.updateSelection(10);
        expect(store.getState().selection.size).to.equal(2);

        store.updateSelection(10);
        expect(store.getState().selection.size).to.equal(0);
      });
    });
  });
});
