import { combineReducers } from 'redux';

import sequence from './sequence';
import label from './label';
import selection from './selection';

export default combineReducers({
  sequence,
  label,
  selection,
});
