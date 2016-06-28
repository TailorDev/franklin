// Actions
const SEARCH = 'franklin/search/SEARCH';
const CLEAR = 'franklin/search/CLEAR';

export function search(value) {
  return { type: SEARCH, value };
}

export function clear() {
  return { type: CLEAR };
}

// Reducer
const initialState = {
  value: '',
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case SEARCH:
      return {
        value: action.value,
      };

    case CLEAR:
      return initialState;

    default: return state;
  }
}
