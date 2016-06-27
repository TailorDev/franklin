import Immutable from 'immutable';
import { defaultSequence } from '../defaults';

// Actions
const LOAD_DEFAULT = 'franklin/sequence/LOAD_DEFAULT';
const LOAD_FILE = 'franklin/sequence/LOAD_FILE';
const SEQUENCE_LOADED = 'franklin/sequence/SEQUENCE_LOADED';

// Action Creators
export function loadDefaultSequence() {
  return { type: LOAD_DEFAULT };
}

export function setSequence(sequence) {
  return { type: SEQUENCE_LOADED, sequence };
}

export function loadFile(file) {
  return dispatch => {
    dispatch({ type: LOAD_FILE });

    const reader = new FileReader();
    reader.onload = (event) => {
      let chunks = event.target.result.split('\n');

      if (/>/.test(chunks[0])) {
        chunks = chunks.slice(1);
      }

      const sequence = new Immutable.List(chunks.join('').split(''));

      dispatch(setSequence(sequence));
    };

    reader.readAsText(file);
  };
}

// Reducer
const initialState = {
  sequence: new Immutable.List(),
  positionFrom: 0,
  loading: false,
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD_FILE:
      return Object.assign({}, state, { loading: true });

    case LOAD_DEFAULT:
      return {
        sequence: defaultSequence,
        positionFrom: state.positionFrom,
        loading: false,
      };

    case SEQUENCE_LOADED:
      return {
        sequence: action.sequence,
        positionFrom: state.positionFrom,
        loading: false,
      };

    default: return state;
  }
}
