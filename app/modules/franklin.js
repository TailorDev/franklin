import { loadDefaultSequence } from './sequence';
import { loadDefaultLabels } from './label';

// Actions
export function loadDefault() {
  return (dispatch) => {
    dispatch(loadDefaultSequence());
    dispatch(loadDefaultLabels());
  };
}
