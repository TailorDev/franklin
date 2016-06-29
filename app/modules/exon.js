import Immutable from 'immutable';

// Actions
const CREATE = 'franklin/exon/CREATE';
const UPDATE_AT = 'franklin/exon/UPDATE_AT';
const REMOVE_AT = 'franklin/exon/REMOVE_AT';

// Action Creators
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
