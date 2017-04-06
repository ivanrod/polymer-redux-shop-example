import { fromJS } from 'immutable';

const INIT_STATE = fromJS({
  tshirts: [],
  other: []
});

const cart = (state = INIT_STATE, action) => {

  const callbacks = {
    default(state) {
      return state;
    },

    ADD_TSHIRT(state, payload) {
      const tshirt = fromJS(payload);
      const newState = state.update('tshirts', arr => arr.push(tshirt));

      return newState;
    },

    ADD_OTHER_ITEM(state, payload) {
      const item = fromJS(payload);
      const newState = state.update('other', arr => arr.push(item));

      return newState;
    },
  };

  return (callbacks[action.type] || callbacks.default)(state, action.payload);
};

export default cart;
