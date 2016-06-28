import { combineReducers } from 'redux';

import sequence from './sequence';
import label from './label';
import selection from './selection';
import search from './search';

export default combineReducers({
  sequence,
  label,
  selection,
  search,
});
