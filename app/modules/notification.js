// Actions
export const NOTIFY = 'franklin/notification/NOTIFY';
const CLOSE = 'franklin/notification/CLOSE';
const CLOSE_CATEGORY = 'franklin/notification/CLOSE_CATEGORY';
const CLOSE_ALL = 'franklin/notification/CLOSE_ALL';

// Action Creators
export function notify(message, level, category = 'default') {
  return { type: NOTIFY, message, level, category };
}

export function close(index) {
  return { type: CLOSE, index };
}

export function closeCategory(category) {
  return { type: CLOSE_CATEGORY, category };
}

export function closeAll() {
  return { type: CLOSE_ALL };
}

export function info(message, category = 'default') {
  return notify(message, 'info', category);
}

export function error(message, category = 'default') {
  return notify(message, 'error', category);
}

export function warning(message, category = 'default') {
  return notify(message, 'warning', category);
}

// Reducer
const initialState = {
  messages: [],
};

function doNotify(state, action) {
  const idx = state.messages.findIndex(
    m => action.message === m.content && action.level === m.level && action.category === m.category
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
      category: action.category,
    }),
  };
}

function doClose(state, action) {
  return {
    messages: state.messages.filter((_, index) => index !== action.index),
  };
}

function doCloseCategory(state, action) {
  return {
    messages: state.messages.filter((message) => message.category !== action.category),
  };
}

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case NOTIFY:
      return doNotify(state, action);

    case CLOSE:
      return doClose(state, action);

    case CLOSE_CATEGORY:
      return doCloseCategory(state, action);

    case CLOSE_ALL:
      return initialState;

    default: return state;
  }
}
