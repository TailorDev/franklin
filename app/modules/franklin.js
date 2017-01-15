import {
  loadDefaultSequence,
  loadFile as loadFileSequence,
} from './sequence';
import {
  loadDefaultLabels,
  loadEmpty as loadEmptyLabels,
  clearSelectedAnnotation,
} from './label';
import {
  loadDefaultExons,
  loadEmpty as loadEmptyExons,
} from './exon';
import { clear as clearSelection } from './selection';
import { clear as clearSearch } from './search';


// Actions
export function loadDefault() {
  return dispatch => Promise.all([
    dispatch(loadDefaultSequence()),
    dispatch(loadDefaultLabels()),
    dispatch(loadDefaultExons()),
  ]);
}

export function loadFile(file) {
  return (dispatch) => {
    dispatch(loadFileSequence(file));
    dispatch(loadEmptyLabels());
    dispatch(loadEmptyExons());
  };
}

export function clear() {
  return (dispatch) => {
    dispatch(clearSelection());
    dispatch(clearSelectedAnnotation());
    dispatch(clearSearch());
  };
}
