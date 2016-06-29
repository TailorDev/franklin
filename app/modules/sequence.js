import Immutable from 'immutable';
import { defaultSequence } from '../defaults';
import Fasta from '../utils/fasta';

// Actions
const LOAD_DEFAULT = 'franklin/sequence/LOAD_DEFAULT';
const LOAD_FILE = 'franklin/sequence/LOAD_FILE';
const SEQUENCE_LOADED = 'franklin/sequence/SEQUENCE_LOADED';
const CHANGE_POSITION_FROM = 'franklin/sequence/CHANGE_POSITION_FROM';

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

      // Customize page title with the current sequence header
      document.title = header;

      dispatch(setSequence(header, sequence));
    };

    reader.readAsText(file);
  };
}

export function changePositionFrom(positionFrom) {
  return { type: CHANGE_POSITION_FROM, positionFrom };
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

    case CHANGE_POSITION_FROM:
      return Object.assign({}, state, {
        positionFrom: action.positionFrom,
      });

    default: return state;
  }
}
