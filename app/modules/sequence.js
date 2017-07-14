import Immutable from 'immutable';
import { defaultSequence } from '../defaults';
import Fasta from '../utils/fasta';
import * as notification from './notification';

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

export function checkUploadedFile(dispatch, { header, sequence }) {
  let newHeader = header;
  const category = 'upload';

  if (sequence.isEmpty() && '' === header) {
    dispatch(notification.error('Empty file', category));
  } else if (sequence.isEmpty()) {
    dispatch(notification.error('No sequence found into the file', category));
  } else if ('' === header || undefined === header) {
    newHeader = 'Unknown';
    dispatch(notification.warning('Undefined title set to unknown', category));
  } else {
    dispatch(notification.closeCategory(category));
  }

  return {
    header: newHeader,
    sequence,
  };
}

export function loadFile(file) {
  return dispatch => {
    dispatch({ type: LOAD_FILE });

    const reader = new FileReader();
    return new Promise(resolve => {
      reader.onload = event => {
        const { header, sequence } = checkUploadedFile(
          dispatch,
          Fasta.parseString(event.target.result)
        );

        // Customize page title with the current sequence header
        document.title = header;

        resolve(dispatch(setSequence(header, sequence)));
      };

      reader.readAsText(file);
    });
  };
}

export function changePositionFrom(positionFrom) {
  return { type: CHANGE_POSITION_FROM, positionFrom };
}

// Reducer
const initialState = {
  sequence: new Immutable.List(),
  positionFrom: 1,
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
        positionFrom: 5,
        loading: false,
      };

    case SEQUENCE_LOADED:
      return {
        name: action.name,
        sequence: action.sequence,
        positionFrom: 1,
        loading: false,
      };

    case CHANGE_POSITION_FROM:
      return Object.assign({}, state, {
        positionFrom: action.positionFrom,
      });

    default:
      return state;
  }
}
