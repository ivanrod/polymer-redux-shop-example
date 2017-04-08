export function createReducer(initialState, handlers) {
  return (state = initialState, action) => {
    if (handlers.hasOwnProperty(action.type)) {
      return (handlers[action.type] || handlers.default)(state, action.payload);
    }

    return state;
  };
}
