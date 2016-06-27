// State
const initialState = {
  from: undefined,
  to: undefined,
};

// Actions
const CLEAR = 'franklin/selection/CLEAR';
const UPDATE = 'franklin/selection/UPDATE';
const UPDATE_SELECTION_FROM = 'franklin/selection/UPDATE_SELECTION_FROM';
const UPDATE_SELECTION_TO = 'franklin/selection/UPDATE_SELECTION_TO';

// Action Creators
export function clear() {
  return { type: CLEAR };
}

export function update(selected) {
  return { type: UPDATE, selected };
}

export function updateSelectionFrom(positionFrom) {
  return { type: UPDATE_SELECTION_FROM, positionFrom };
}

export function updateSelectionTo(positionTo) {
  return { type: UPDATE_SELECTION_TO, positionTo };
}

function calculateSelection(from, to) {
  if (from < to) {
    return { from, to };
  }

  return { from: to, to: from };
}

function doUpdate(state, action) {
  const selected = action.selected;

  if (selected === state.from || selected === state.to) {
    return initialState;
  } else if ((undefined === state.from) || (state.from && state.to)) {
    return { from: selected, to: undefined };
  } else if (undefined === state.to) {
    return calculateSelection(selected, state.from);
  }

  return state;
}

/**
 * Here, we pass a position in the sequence, which is NOT the index. By now,
 * the offset between is a position and its corresponding index is `-1`,
 * hence the code below.
 */
function doUpdateSelectionFrom(state, action) {
  const positionFrom = action.positionFrom;

  return { from: positionFrom - 1, to: state.to };
}

/**
 * Here, we pass a position in the sequence, which is NOT the index. By now,
 * the offset between is a position and its corresponding index is `-1`,
 * hence the code below.
 */
function doUpdateSelectionTo(state, action) {
  const positionTo = action.positionTo;

  return { from: state.from, to: positionTo - 1 };
}

// Reducer
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case CLEAR:
      return initialState;

    case UPDATE:
      return doUpdate(state, action);

    case UPDATE_SELECTION_FROM:
      return doUpdateSelectionFrom(state, action);

    case UPDATE_SELECTION_TO:
      return doUpdateSelectionTo(state, action);

    default: return state;
  }
}
