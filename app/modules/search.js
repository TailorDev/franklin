const SEARCH = 'franklin/search/SEARCH';
const CLEAR = 'franklin/search/CLEAR';

export function search(value, matches) {
  return { type: SEARCH, value, matches };
}

export function clear() {
  return { type: CLEAR };
}

// Reducer
const initialState = {
  value: '',
  matches: 0,
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case SEARCH:
      return {
        value: action.value,
        matches: action.matches,
      };

    case CLEAR:
      return initialState;

    default: return state;
  }
}
