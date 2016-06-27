import Immutable from 'immutable';
import { defaultSequence } from '../defaults';

// Actions
const LOAD_DEFAULT = 'franklin/sequence/LOAD_DEFAULT';
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
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD_DEFAULT:
      return { sequence: defaultSequence, positionFrom: state.positionFrom };

    case SEQUENCE_LOADED:
      return { sequence: action.sequence, positionFrom: state.positionFrom };

    default: return state;
  }
}
