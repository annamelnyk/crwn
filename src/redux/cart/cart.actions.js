import CartActionsTypes from './cart.types.js';

export const toggleCardHidden = () => ({
  type: CartActionsTypes.TOGGLE_CART_HIDDEN,
});

export const addItem = (item) => ({
  type: CartActionsTypes.ADD_ITEM,
  payload: item
});

export const removeItem = (item) => ({
  type: CartActionsTypes.REMOVE_ITEM,
  payload: item
});

export const descreaseQuantity = (item) => ({
  type: CartActionsTypes.DECREASE_QUANTITY,
  payload: item
});
