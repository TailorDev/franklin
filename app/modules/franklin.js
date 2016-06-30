import { loadDefaultSequence, loadFile as loadFileSequence } from './sequence';
import {
  loadDefaultLabels,
  loadEmpty as loadEmptyLabels,
  clearSelectedAnnotation,
} from './label';
import { clear as clearSelection } from './selection';
import { clear as clearSearch } from './search';
import { loadDefaultExons } from './exon';


// Actions
export function loadDefault() {
  return (dispatch) => {
    dispatch(loadDefaultSequence());
    dispatch(loadDefaultLabels());
    dispatch(loadDefaultExons());
  };
}

export function loadFile(file) {
  return (dispatch) => {
    dispatch(loadFileSequence(file));
    dispatch(loadEmptyLabels());
  };
}

export function clear() {
  return (dispatch) => {
    dispatch(clearSelection());
    dispatch(clearSelectedAnnotation());
    dispatch(clearSearch());
  };
}
