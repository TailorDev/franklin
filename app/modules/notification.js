// Actions
export const NOTIFY = 'franklin/notification/NOTIFY';
const CLOSE = 'franklin/notification/CLOSE';
const CLOSE_ALL = 'franklin/notification/CLOSE_ALL';

// Action Creators
export function notify(message, level) {
  return { type: NOTIFY, message, level };
}

export function close(index) {
  return { type: CLOSE, index };
}

export function closeAll() {
  return { type: CLOSE_ALL };
}

export function info(message) {
  return notify(message, 'info');
}

export function error(message) {
  return notify(message, 'error');
}

export function warning(message) {
  return notify(message, 'warning');
}

// Reducer
const initialState = {
  messages: [],
};

function doNotify(state, action) {
  const idx = state.messages.findIndex(
    m => action.message === m.content && action.level === m.level
  );

  if (-1 !== idx) {
    return {
      messages: state.messages.map((m, index) => {
        if (idx === index) {
          return {
            ...m,
            count: m.count + 1,
          };
        }

        return m;
      }),
    };
  }

  return {
    messages: state.messages.concat({
      content: action.message,
      level: action.level,
      count: 1,
    }),
  };
}

function doClose(state, action) {
  return {
    messages: state.messages.filter((_, index) => index !== action.index),
  };
}

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case NOTIFY:
      return doNotify(state, action);

    case CLOSE:
      return doClose(state, action);

    case CLOSE_ALL:
      return initialState;

    default: return state;
  }
}
