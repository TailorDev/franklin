import Immutable from 'immutable';
import { defaultLabels } from '../defaults';

// Actions
const LOAD_DEFAULT = 'franklin/label/LOAD_DEFAULT';
const CREATE = 'franklin/label/CREATE';
const UPDATE_AT = 'franklin/label/UPDATE_AT';
const REMOVE_AT = 'franklin/label/REMOVE_AT';
const TOGGLE_AT = 'franklin/label/TOGGLE_AT';
const CREATE_ANNOTATION = 'franklin/label/CREATE_ANNOTATION';
const UPDATE_ANNOTATION = 'franklin/label/UPDATE_ANNOTATION';
const SELECT_ANNOTATION = 'franklin/label/SELECT_ANNOTATION';

// Action Creators
export function loadDefaultLabels() {
  return { type: LOAD_DEFAULT };
}

export function create(label) {
  return { type: CREATE, label };
}

export function updateAt(index, label) {
  return { type: UPDATE_AT, index, label };
}

export function removeAt(index) {
  return { type: REMOVE_AT, index };
}

export function toggleAt(index) {
  return { type: TOGGLE_AT, index };
}

export function createAnnotation(labelId, annotation) {
  return { type: CREATE_ANNOTATION, labelId, annotation };
}

export function updateAnnotation(labelId, annotationId, annotation) {
  return { type: UPDATE_ANNOTATION, labelId, annotationId, annotation };
}

export function selectAnnotation(labelId, annotation) {
  return { type: SELECT_ANNOTATION, labelId, annotation };
}

function doCreateAnnotation(state, action) {
  if (null === action.labelId || !state.labels.has(action.labelId)) {
    return state;
  }

  return {
    labels: state.labels.update(action.labelId, (v) => (
      {
        name: v.name,
        color: v.color,
        isActive: v.isActive,
        annotations: v.annotations.push(action.annotation),
      }
    )),
    current: null,
  };
}

function doUpdateAnnotation(state, action) {
  const labelId = action.labelId;
  const annotationId = action.annotationId;
  const annotation = action.annotation;

  if (null === labelId || !state.labels.has(labelId)) {
    return state;
  }

  if (null === annotationId || !state.labels.get(labelId).annotations.has(annotationId)) {
    return state;
  }

  return {
    labels: state.labels.update(labelId, (v) => (
      {
        name: v.name,
        color: v.color,
        isActive: v.isActive,
        annotations: v.annotations.update(annotationId, () => annotation),
      }
    )),
    current: null,
  };
}

function doSelectAnnotation(state, action) {
  const labelId = action.labelId;
  const annotation = action.annotation;

  if (!state.labels.has(labelId)) {
    return state;
  }

  const annotationId = state.labels.get(labelId).annotations.findKey((v) => (
    v.positionFrom === annotation.positionFrom && v.positionTo === annotation.positionTo
  ));

  if (undefined === annotationId) {
    return state;
  }

  return Object.assign({}, state, {
    current: {
      labelId,
      annotationId,
      annotation,
    },
  });
}

// Reducer
const initialState = {
  labels: new Immutable.List(),
  current: null,
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD_DEFAULT:
      return {
        labels: defaultLabels,
        current: null,
      };

    case CREATE:
      return {
        labels: state.labels.push(action.label),
        current: null,
      };

    case UPDATE_AT:
      return {
        labels: state.labels.update(action.index, () => (
          {
            name: action.label.name,
            color: action.label.color,
            isActive: true,
            annotations: action.label.annotations,
          }
        )),
        current: null,
      };

    case REMOVE_AT:
      return {
        labels: state.labels.splice(action.index, 1),
        current: null,
      };

    case TOGGLE_AT:
      return {
        labels: state.labels.update(action.index, (label) => (
          {
            name: label.name,
            color: label.color,
            isActive: !label.isActive,
            annotations: label.annotations,
          }
        )),
        current: null,
      };

    case CREATE_ANNOTATION:
      return doCreateAnnotation(state, action);

    case UPDATE_ANNOTATION:
      return doUpdateAnnotation(state, action);

    case SELECT_ANNOTATION:
      return doSelectAnnotation(state, action);

    default: return state;
  }
}
