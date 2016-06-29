import Immutable from 'immutable';
import { defaultSequence } from '../defaults';
import Fasta from '../utils/fasta';

// Actions
const LOAD_DEFAULT = 'franklin/sequence/LOAD_DEFAULT';
const LOAD_FILE = 'franklin/sequence/LOAD_FILE';
const SEQUENCE_LOADED = 'franklin/sequence/SEQUENCE_LOADED';

// Action Creators
export function loadDefaultSequence() {
  return { type: LOAD_DEFAULT };
}

export function setSequence(name, sequence) {
  return { type: SEQUENCE_LOADED, name, sequence };
}

export function loadFile(file) {
  return dispatch => {
    dispatch({ type: LOAD_FILE });

    const reader = new FileReader();
    reader.onload = (event) => {
      const { header, sequence } = Fasta.parseString(event.target.result);

      dispatch(setSequence(header, sequence));
    };

    reader.readAsText(file);
  };
}

// Reducer
const initialState = {
  sequence: new Immutable.List(),
  positionFrom: 0,
  loading: false,
  name: '',
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD_FILE:
      return Object.assign({}, state, { loading: true });

    case LOAD_DEFAULT:
      return {
        name: 'Demo sequence',
        sequence: defaultSequence,
        positionFrom: 1,
        loading: false,
      };

    case SEQUENCE_LOADED:
      return {
        name: action.name,
        sequence: action.sequence,
        // TODO: allow user input for from/to positions (at least from)
        positionFrom: 1,
        loading: false,
      };

    default: return state;
  }
}
