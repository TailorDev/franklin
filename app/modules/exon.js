import Immutable from 'immutable';
import { defaultExons } from '../defaults';

// Actions
const LOAD_DEFAULT = 'franklin/exon/LOAD_DEFAULT';
const LOAD_EMPTY = 'franklin/exon/LOAD_EMPTY';
const CREATE = 'franklin/exon/CREATE';
const UPDATE_AT = 'franklin/exon/UPDATE_AT';
const REMOVE_AT = 'franklin/exon/REMOVE_AT';

// Action Creators
export function loadDefaultExons() {
  return { type: LOAD_DEFAULT };
}

export function loadEmpty() {
  return { type: LOAD_EMPTY };
}

export function create(exon) {
  return { type: CREATE, exon };
}

export function updateAt(index, exon) {
  return { type: UPDATE_AT, index, exon };
}

export function removeAt(index) {
  return { type: REMOVE_AT, index };
}

// Reducer
const initialState = {
  exons: new Immutable.List(),
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD_EMPTY:
      return initialState;

    case LOAD_DEFAULT:
      return {
        exons: defaultExons,
      };

    case CREATE:
      return {
        exons: state.exons.push(action.exon),
      };

    case UPDATE_AT:
      return {
        exons: state.exons.update(action.index, () => (
          {
            name: action.exon.name,
            positionFrom: action.exon.positionFrom,
            positionTo: action.exon.positionTo,
          }
        )),
      };

    case REMOVE_AT:
      return {
        exons: state.exons.splice(action.index, 1),
      };

    default: return state;
  }
}
