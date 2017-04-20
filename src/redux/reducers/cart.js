import { fromJS } from 'immutable';

import { createReducer } from '../utils/reducers.utils';
import {
  ADD_TO_CART,
  CHECKOUT_REQUEST,
  CHECKOUT_FAILURE
} from '../constants/ActionTypes';

const INIT_STATE = fromJS({
  addedIds: [],
  sizeById: {},
  quantityById: {}
});

const addId = productId => {
  return addedIds => {
    if (addedIds.indexOf(productId) !== -1) {
      return addedIds;
    }
    return addedIds.push(productId);
  };
};

const addSize = productSize => {
  return size => (size ? size : productSize);
};

const cartHandlers = {
  default(state) {
    return state;
  },

  [ADD_TO_CART](state, payload) {
    const { productId, productSize } = payload;

    const newState = state
                      .update('addedIds', addId(productId))
                      .updateIn(['quantityById', productId], quantity => quantity ? quantity++ : 1)
                      .updateIn(['sizeById', productId], addSize(productSize));
    return newState;
  },

  [CHECKOUT_REQUEST]() {
    return INIT_STATE;
  },

  [CHECKOUT_FAILURE](state, payload) {
    const { cart } = payload;

    return cart;
  },

};

export default createReducer(INIT_STATE, cartHandlers);
