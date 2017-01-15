import Immutable from 'immutable';
import { defaultLabels } from '../defaults';

// Actions
const LOAD_DEFAULT = 'franklin/label/LOAD_DEFAULT';
const LOAD_EMPTY = 'franklin/label/LOAD_EMPTY';
const CREATE = 'franklin/label/CREATE';
const UPDATE_AT = 'franklin/label/UPDATE_AT';
const REMOVE_AT = 'franklin/label/REMOVE_AT';
const TOGGLE_AT = 'franklin/label/TOGGLE_AT';
const CREATE_ANNOTATION = 'franklin/label/CREATE_ANNOTATION';
const UPDATE_ANNOTATION = 'franklin/label/UPDATE_ANNOTATION';
const SELECT_ANNOTATION = 'franklin/label/SELECT_ANNOTATION';
const CLEAR_SELECTED_ANNOTATION = 'franklin/label/CLEAR_SELECTED_ANNOTATION';
const REMOVE_ANNOTATION = 'franklin/label/REMOVE_ANNOTATION';

// Action Creators
export function loadDefaultLabels() {
  return { type: LOAD_DEFAULT };
}

export function loadEmpty() {
  return { type: LOAD_EMPTY };
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

export function clearSelectedAnnotation() {
  return { type: CLEAR_SELECTED_ANNOTATION };
}

export function removeAnnotation(labelId, annotationId) {
  return { type: REMOVE_ANNOTATION, labelId, annotationId };
}

function doCreateAnnotation(state, action) {
  if (null === action.labelId || !state.labels.has(action.labelId)) {
    return state;
  }

  return {
    labels: state.labels.update(action.labelId, v => (
      {
        name: v.name,
        color: v.color,
        isActive: v.isActive,
        annotations: v.annotations.push(action.annotation),
      }
    )),
    selectedAnnotation: null,
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
    labels: state.labels.update(labelId, v => (
      {
        name: v.name,
        color: v.color,
        isActive: v.isActive,
        annotations: v.annotations.update(annotationId, () => annotation),
      }
    )),
    selectedAnnotation: null,
  };
}

function doRemoveAnnotation(state, action) {
  const labelId = action.labelId;
  const annotationId = action.annotationId;

  if (null === labelId || !state.labels.has(labelId)) {
    return state;
  }

  if (null === annotationId || !state.labels.get(labelId).annotations.has(annotationId)) {
    return state;
  }

  return {
    labels: state.labels.update(labelId, v => (
      {
        name: v.name,
        color: v.color,
        isActive: v.isActive,
        annotations: v.annotations.remove(annotationId),
      }
    )),
    selectedAnnotation: null,
  };
}

function doSelectAnnotation(state, action) {
  const labelId = action.labelId;
  const annotation = action.annotation;

  if (!state.labels.has(labelId)) {
    return state;
  }

  const annotationId = state.labels.get(labelId).annotations.findKey(v => (
    v.positionFrom === annotation.positionFrom && v.positionTo === annotation.positionTo
  ));

  if (undefined === annotationId) {
    return state;
  }

  return Object.assign({}, state, {
    selectedAnnotation: {
      labelId,
      annotationId,
      annotation,
    },
  });
}

// Reducer
const initialState = {
  labels: new Immutable.List(),
  selectedAnnotation: null,
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD_EMPTY:
      return initialState;

    case LOAD_DEFAULT:
      return {
        labels: defaultLabels,
        selectedAnnotation: null,
      };

    case CREATE:
      return {
        labels: state.labels.push(action.label),
        selectedAnnotation: null,
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
        selectedAnnotation: null,
      };

    case REMOVE_AT:
      return {
        labels: state.labels.splice(action.index, 1),
        selectedAnnotation: null,
      };

    case TOGGLE_AT:
      return Object.assign({}, state, {
        labels: state.labels.update(action.index, label => (
          {
            name: label.name,
            color: label.color,
            isActive: !label.isActive,
            annotations: label.annotations,
          }
        )),
      });

    case CREATE_ANNOTATION:
      return doCreateAnnotation(state, action);

    case UPDATE_ANNOTATION:
      return doUpdateAnnotation(state, action);

    case SELECT_ANNOTATION:
      return doSelectAnnotation(state, action);

    case CLEAR_SELECTED_ANNOTATION:
      return Object.assign({}, state, { selectedAnnotation: null });

    case REMOVE_ANNOTATION:
      return doRemoveAnnotation(state, action);

    default: return state;
  }
}
