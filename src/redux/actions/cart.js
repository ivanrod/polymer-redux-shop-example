import * as types from '../constants/ActionTypes';
import { behaviorCreator } from '../utils/actions.utils';

const addToCartUnsafe = product => ({
  type: types.ADD_TO_CART,
  payload: product
});

export const addToCart = (productId, productSize) => (dispatch, getState) => {
  dispatch(addToCartUnsafe({productId, productSize}));
};

export default behaviorCreator({
  addToCart
});
