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

function doUpdate(state, action) {
  const selected = action.selected;
  const from = state.selections[0] ? state.selections[0].from : undefined;
  const to = state.selections[0] ? state.selections[0].to : undefined;

  if (selected === from || selected === to) {
    return initialState;
  } else if (undefined === from || (from && to)) {
    return {
      selections: [{ from: selected, to: undefined }],
    };
  } else if (undefined === to) {
    return {
      selections: [{ from, to: selected }],
    };
  }

  return state;
}

function doUpdateSelectionFrom(state, action) {
  const positionFrom = action.positionFrom;
  const to = state.selections[0] ? state.selections[0].to : undefined;

  return {
    selections: [{ from: positionFrom, to }],
  };
}

function doUpdateSelectionTo(state, action) {
  const positionTo = action.positionTo;
  const from = state.selections[0] ? state.selections[0].from : undefined;

  return {
    selections: [{ from, to: positionTo }],
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

    default:
      return state;
  }
}
