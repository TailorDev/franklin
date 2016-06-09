import Store, { Events } from '../Store';
import { defaultLabels } from '../defaults';
import sinon from 'sinon';
import { expect } from 'chai';
import Immutable from 'immutable';

// see: https://github.com/mochajs/mocha/issues/1847
const { Promise, beforeEach, afterEach, describe, it } = global;


describe('Store', () => {

  let eventEmitterSpy, store;

  beforeEach(() => {
    eventEmitterSpy = sinon.spy();
    store = new Store({ emit: eventEmitterSpy }, defaultLabels);
  });

  describe('labels', () => {
    describe('addNewLabel()', () => {
      it ('adds the given label to its state', () => {
        expect(store.getState().labels.size).to.equal(3);

        store.addNewLabel({
          name: 'Will',
          color: '#123456',
          isActive: true,
          annotations: Immutable.List(),
        });

        expect(eventEmitterSpy.calledOnce).to.be.true;
        expect(eventEmitterSpy.calledWith(Events.CHANGE)).to.be.true;
        expect(store.getState().labels.size).to.equal(4);
      });
    });

    describe('updateLabelAt()', () => {
      it ('updates a label at a given index', () => {
        expect(store.getState().labels.get(0).name).to.equal('Exon');

        store.updateLabelAt(0, {
          name: 'Will',
          color: '#123456',
          isActive: true,
          annotations: Immutable.List(),
        });

        expect(eventEmitterSpy.calledOnce).to.be.true;
        expect(eventEmitterSpy.calledWith(Events.CHANGE)).to.be.true;
        expect(store.getState().labels.get(0).name).to.equal('Will');
      });
    });

    describe('removeLabelAt()', () => {
      it ('removes a label at a given index', () => {
        expect(store.getState().labels.size).to.equal(3);

        store.removeLabelAt(0);

        expect(eventEmitterSpy.calledOnce).to.be.true;
        expect(eventEmitterSpy.calledWith(Events.CHANGE)).to.be.true;
        expect(store.getState().labels.size).to.equal(2);
        expect(store.getState().labels.get(0).name).to.equal('Primer');
      });
    });

    describe('toggleLabelAt()', () => {
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
    describe('updateSelection()', () => {
      it('updates the selection', () => {
        store.updateSelection(2);

        expect(eventEmitterSpy.calledOnce).to.be.true;
        expect(eventEmitterSpy.calledWith(Events.CHANGE_SELECTION)).to.be.true;
        expect(store.getState().selection.from).to.equal(2);
        expect(store.getState().selection.to).to.equal(undefined);
      });

      it('restricts the selection boundaries', () => {
        expect(store.getState().selection.from).to.equal(undefined);
        expect(store.getState().selection.to).to.equal(undefined);

        store.updateSelection(2);
        expect(store.getState().selection.from).to.equal(2);

        store.updateSelection(3);
        expect(store.getState().selection.to).to.equal(3);

        store.updateSelection(10);
        expect(store.getState().selection.from).to.equal(10);

        store.updateSelection(1);
        expect(store.getState().selection.from).to.equal(1);
      });

      it('allows "unselection" by selecting on of the boundaries', () => {
        store.updateSelection(1);
        store.updateSelection(10);
        expect(store.getState().selection.from).to.equal(1);
        expect(store.getState().selection.to).to.equal(10);

        store.updateSelection(10);
        expect(store.getState().selection.from).to.equal(undefined);
        expect(store.getState().selection.to).to.equal(undefined);
      });
    });

    describe('clearSelection()', () => {
      it('assigns from/to with undefined', () => {
        store.updateSelection(1);
        expect(store.getState().selection.from).to.equal(1);
        expect(store.getState().selection.to).to.equal(undefined);

        eventEmitterSpy.reset();

        // test starts here
        store.clearSelection();

        expect(store.getState().selection.from).to.equal(undefined);
        expect(store.getState().selection.to).to.equal(undefined);

        expect(eventEmitterSpy.calledOnce).to.be.true;
        expect(eventEmitterSpy.calledWith(Events.CHANGE_SELECTION)).to.be.true;
      });
    });

    describe('updateSelectionFrom()', () => {
      it('only changes the from selection', () => {
        store.updateSelection(1);
        store.updateSelection(3);
        expect(store.getState().selection.from).to.equal(1);
        expect(store.getState().selection.to).to.equal(3);

        eventEmitterSpy.reset();

        // test starts here
        store.updateSelectionFrom(23);

        expect(store.getState().selection.from).to.equal(23 - 1); // offset
        expect(store.getState().selection.to).to.equal(3);

        expect(eventEmitterSpy.calledOnce).to.be.true;
        expect(eventEmitterSpy.calledWith(Events.CHANGE_SELECTION)).to.be.true;
      });
    });

    describe('updateSelectionTo()', () => {
      it('only changes the to selection', () => {
        store.updateSelection(1);
        store.updateSelection(3);
        expect(store.getState().selection.from).to.equal(1);
        expect(store.getState().selection.to).to.equal(3);

        eventEmitterSpy.reset();

        // test starts here
        store.updateSelectionTo(23);

        expect(store.getState().selection.from).to.equal(1);
        expect(store.getState().selection.to).to.equal(23 - 1); // offset

        expect(eventEmitterSpy.calledOnce).to.be.true;
        expect(eventEmitterSpy.calledWith(Events.CHANGE_SELECTION)).to.be.true;
      });
    });
  });

  describe('annotation', () => {
    describe('addNewAnnotation()', () => {
      it('adds an annotation to an existing label', () => {
        const labelId = 0; // Exon
        const newAnnotation = {
          positionFrom: 0,
          positionTo: 10,
          comment: 'Foo bar',
        };

        store.addNewAnnotation(labelId, newAnnotation);

        expect(eventEmitterSpy.calledOnce).to.be.true;
        expect(eventEmitterSpy.calledWith(Events.CHANGE)).to.be.true;

        const state = eventEmitterSpy.args[0][1];

        expect(state.labels.get(0).annotations.size).to.equal(
          defaultLabels.get(0).annotations.size + 1
        );
        expect(state.labels.get(0).annotations.last()).to.equal(newAnnotation);
      });

      it('does not do anything if label does not exist', () => {
        const labelId = 1234; // non-existent
        const newAnnotation = {
          positionFrom: 0,
          positionTo: 10,
          comment: 'Foo bar',
        };

        store.addNewAnnotation(labelId, newAnnotation);

        expect(eventEmitterSpy.called).to.be.false;
      });
    });

    describe('selectAnnotation()', () => {
      it('does not do anything if label does not exist', () => {
        const labelId = 1234; // non-existent
        const newAnnotation = {
          positionFrom: 0,
          positionTo: 10,
          comment: 'Foo bar',
        };

        store.selectAnnotation(labelId, newAnnotation);

        expect(eventEmitterSpy.called).to.be.false;
      });

      it('does not do anything if annotation does not exist', () => {
        const labelId = 0; // Exon
        const newAnnotation = {
          positionFrom: 0,
          positionTo: 10,
          comment: 'Foo bar',
        };

        store.selectAnnotation(labelId, newAnnotation);

        expect(eventEmitterSpy.called).to.be.false;
      });

      it('emits an event if label and annotation exist', () => {
        const labelId = 0; // Exon
        const existingAnnotation = defaultLabels.get(labelId).annotations.first();

        store.selectAnnotation(labelId, existingAnnotation);

        expect(eventEmitterSpy.calledOnce).to.be.true;
        expect(eventEmitterSpy.calledWith(Events.CHANGE_CURRENT_ANNOTATION)).to.be.true;
      });
    });

    describe('updateAnnotationAt()', () => {
      it('does not do anything if label does not exist', () => {
        const labelId = 1234; // non-existent
        const annotationId = 5678; // non-existent
        const annotation = {};

        store.updateAnnotationAt(labelId, annotationId, annotation);

        expect(eventEmitterSpy.called).to.be.false;
      });

      it('does not do anything if annotation does not exist', () => {
        const labelId = 0; // Exon
        const annotationId = 5678; // non-existent
        const annotation = {};

        store.updateAnnotationAt(labelId, annotationId, annotation);

        expect(eventEmitterSpy.called).to.be.false;
      });

      it('updates an existing annotation', () => {
        const labelId = 0; // Exon
        const annotationId = 0;
        const existingAnnotation = defaultLabels.get(labelId).annotations.get(annotationId);

        store.updateAnnotationAt(labelId, annotationId, Object.assign(
          {}, existingAnnotation, { comment: 'bar' }
        ));

        expect(eventEmitterSpy.calledOnce).to.be.true;
        expect(eventEmitterSpy.calledWith(Events.CHANGE)).to.be.true;

        const updatedAnnotation = store.getState().labels.get(labelId).annotations.get(annotationId);

        expect(updatedAnnotation.comment).to.equal('bar');
        expect(existingAnnotation.comment).to.equal('ENSE000036121231');
      });
    });
  });
});
