/* eslint import/no-named-as-default: 0 */
import { combineReducers } from 'redux';

import sequence from './sequence';
import label from './label';
import selection from './selection';
import search from './search';
import exon from './exon';

export default combineReducers({
  sequence,
  label,
  selection,
  search,
  exon,
});
