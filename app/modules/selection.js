// State
const initialState = {
  // TODO: add Immutable.List()
  selections: [], // { from: ..., to: ... }
};

// Actions
const CLEAR = 'franklin/selection/CLEAR';
const UPDATE = 'franklin/selection/UPDATE';
const UPDATE_SELECTION_FROM = 'franklin/selection/UPDATE_SELECTION_FROM';
const UPDATE_SELECTION_TO = 'franklin/selection/UPDATE_SELECTION_TO';
const MULTI_SELECT = 'franklin/selection/MULTI_SELECT';

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

export function multiSelect(selections) {
  return { type: MULTI_SELECT, selections };
}

function calculateSelection(from, to) {
  if (from < to || undefined === from || undefined === to) {
    return { from, to };
  }

  return { from: to, to: from };
}

function doUpdate(state, action) {
  const selected = action.selected;
  const from = state.selections[0] ? state.selections[0].from : undefined;
  const to = state.selections[0] ? state.selections[0].to : undefined;

  if (selected === from || selected === to) {
    return initialState;
  } else if ((undefined === from) || (from && to)) {
    return {
      selections: [{ from: selected, to: undefined }],
    };
  } else if (undefined === to) {
    return {
      selections: [calculateSelection(selected, from)],
    };
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
  const to = state.selections[0] ? state.selections[0].to : undefined;

  return {
    selections: [calculateSelection(positionFrom - 1, to)],
  };
}

/**
 * Here, we pass a position in the sequence, which is NOT the index. By now,
 * the offset between is a position and its corresponding index is `-1`,
 * hence the code below.
 */
function doUpdateSelectionTo(state, action) {
  const positionTo = action.positionTo;
  const from = state.selections[0] ? state.selections[0].from : undefined;

  return {
    selections: [calculateSelection(from, positionTo - 1)],
  };
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

    case MULTI_SELECT:
      return {
        selections: action.selections,
      };

    default: return state;
  }
}
