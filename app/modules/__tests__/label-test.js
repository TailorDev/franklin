import { expect } from 'chai';
import Immutable from 'immutable';
import reducer, * as actions from '../label';
import { defaultLabels } from '../../defaults';

// see: https://github.com/mochajs/mocha/issues/1847
const { describe, it } = global;


describe('modules/label', () => {
  it('should return the initial state', () => {
    const state = reducer(undefined, {});

    expect(state.labels).to.be.defined;
    expect(state.selectedAnnotation).to.be.defined;
    expect(state.labels.size).to.be.empty;
  });

  it('should handle LOAD_DEFAULT', () => {
    const state = reducer(undefined, actions.loadDefaultLabels());

    expect(state.labels).to.be.defined;
    expect(state.selectedAnnotation).to.be.defined;
    expect(state.labels.size).to.equal(3);
  });

  it('should handle CREATE', () => {
    const state = reducer(undefined, actions.create({
      name: 'Will',
      color: '#123456',
      isActive: true,
      annotations: Immutable.List(),
    }));

    expect(state.labels).to.be.defined;
    expect(state.selectedAnnotation).to.be.defined;
    expect(state.labels.size).to.equal(1);
    expect(state.labels.get(0).name).to.equal('Will');
  });

  it('should handle UPDATE_AT', () => {
    const previousState = reducer(undefined, actions.create({
      name: 'Will',
      color: '#123456',
      isActive: true,
      annotations: Immutable.List(),
    }));
    const state = reducer(previousState, actions.updateAt(0, {
      name: 'Jul',
      color: '#123456',
      isActive: true,
      annotations: Immutable.List(),
    }));

    expect(state.labels).to.be.defined;
    expect(state.selectedAnnotation).to.be.defined;
    expect(state.labels.size).to.equal(1);
    expect(state.labels.get(0).name).to.equal('Jul');
  });

  it('should handle REMOVE_AT', () => {
    const previousState = reducer(undefined, actions.create({
      name: 'Will',
      color: '#123456',
      isActive: true,
      annotations: Immutable.List(),
    }));
    const state = reducer(previousState, actions.removeAt(0));

    expect(state.labels).to.be.defined;
    expect(state.selectedAnnotation).to.be.defined;
    expect(state.labels.size).to.be.empty;
  });

  it('should handle TOGGLE_AT', () => {
    let state;

    state = reducer(undefined, actions.create({
      name: 'Will',
      color: '#123456',
      isActive: true,
      annotations: Immutable.List(),
    }));
    state = reducer(state, actions.toggleAt(0));

    expect(state.labels).to.be.defined;
    expect(state.selectedAnnotation).to.be.defined;
    expect(state.labels.size).to.equal(1);
    expect(state.labels.get(0).isActive).to.be.false;

    state = reducer(state, actions.toggleAt(0));
    expect(state.labels.get(0).isActive).to.be.true;

    state = reducer(state, actions.toggleAt(0));
    expect(state.labels.get(0).isActive).to.be.false;
  });

  describe('CREATE_ANNOTATION', () => {
    it('should handle CREATE_ANNOTATION', () => {
      let state;

      state = reducer(undefined, actions.create({
        name: 'Will',
        color: '#123456',
        isActive: true,
        annotations: Immutable.List(),
      }));
      expect(state.labels.get(0).annotations.size).to.equal(0);

      state = reducer(state, actions.createAnnotation(0, {
        positionFrom: 12,
        positionTo: 34,
        comment: 'Hello',
      }));
      expect(state.labels.get(0).annotations.size).to.equal(1);
    });

    it('does not do anything if label does not exist', () => {
      const labelId = 1234; // non-existent
      const annotation = {
        positionFrom: 0,
        positionTo: 10,
        comment: 'Foo bar',
      };

      let state;

      state = reducer(undefined, actions.create({
        name: 'Will',
        color: '#123456',
        isActive: true,
        annotations: Immutable.List(),
      }));
      expect(state.labels.get(0).annotations.size).to.equal(0);

      state = reducer(state, actions.createAnnotation(labelId, annotation));
      expect(state.labels.get(0).annotations.size).to.equal(0);
    });
  });

  describe('SELECT_ANNOTATION', () => {
    it('does not do anything if label does not exist', () => {
      const labelId = 1234; // non-existent
      const annotation = {
        positionFrom: 0,
        positionTo: 10,
        comment: 'Foo bar',
      };

      state = reducer(undefined, actions.selectAnnotation(labelId, annotation));
      expect(state.labels.size).to.be.empty;
      expect(state.selectedAnnotation).to.be.null;
    });

    it('does not do anything if annotation does not exist', () => {
      const labelId = 0; // Exon
      const annotation = {
        positionFrom: 0,
        positionTo: 10,
        comment: 'Foo bar',
      };

      let state;

      state = reducer(undefined, actions.create({
        name: 'Will',
        color: '#123456',
        isActive: true,
        annotations: Immutable.List(),
      }));
      expect(state.labels.get(0).annotations.size).to.equal(0);

      const s = reducer(state, actions.selectAnnotation(labelId, annotation));
      expect(s.labels.get(0).annotations.size).to.be.empty;
      expect(s).to.equal(state); // ensure they are exactly the same
      expect(s.selectedAnnotation).to.be.null;
    });

    it('returns a selectedAnnotation selected annotation', () => {
      const labelId = 0;
      const annotation = defaultLabels.get(labelId).annotations.first();

      const initialState = reducer(undefined, actions.loadDefaultLabels());
      const state = reducer(initialState, actions.selectAnnotation(
        labelId, annotation
      ));
      expect(state.selectedAnnotation).not.to.be.null;
      expect(state.selectedAnnotation.annotation).to.be.equal(annotation);
    });
  });

  describe('UPDATE_ANNOTATION', () => {
    it('does not do anything if label does not exist', () => {
      const labelId = 1234; // non-existent
      const annotationId = 5678; // non-existent
      const annotation = {};

      const initialState = reducer(undefined, actions.loadDefaultLabels());
      const state = reducer(initialState, actions.updateAnnotation(
        labelId, annotationId, annotation
      ));
      expect(state).to.equal(initialState); // ensure they are exactly the same
    });

    it('does not do anything if annotation does not exist', () => {
      const labelId = 0; // Exon
      const annotationId = 5678; // non-existent
      const annotation = {};

      const initialState = reducer(undefined, actions.loadDefaultLabels());
      const state = reducer(initialState, actions.updateAnnotation(
        labelId, annotationId, annotation
      ));
      expect(state).to.equal(initialState); // ensure they are exactly the same
    });

    it('updates an existing annotation', () => {
      const labelId = 0; // Exon
      const annotationId = 0;
      const annotation = {
        positionFrom: 12,
        positionTo: 34,
        comment: 'Hello',
      };

      const initialState = reducer(undefined, actions.loadDefaultLabels());
      const state = reducer(initialState, actions.updateAnnotation(
        labelId, annotationId, annotation
      ));
      expect(state).to.not.equal(initialState);
      expect(state.labels.get(labelId).annotations.get(annotationId)).to.equal(annotation);
    });
  });
});
