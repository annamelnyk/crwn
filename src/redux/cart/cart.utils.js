export const addItemToCart = (cartItems, cartItemToAdd) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToAdd.id
  );

  if (existingCartItem) {
    return cartItems.map((cartItem) => {
      return cartItem.id === existingCartItem.id
      ? { ...cartItem, quantity: cartItem.quantity + 1 }
      : cartItem;
    });
  }

  return [ ...cartItems, { ...cartItemToAdd, quantity: 1 }]
};

export const decreaseItemQuantity = (cartItems, cartItemToAdd) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToAdd.id
  );

  if (existingCartItem) {
    return cartItems.map((cartItem) => {
      return cartItem.id === existingCartItem.id
      ? { ...cartItem, quantity: cartItem.quantity === 1 ? 1 : cartItem.quantity - 1 }
      : cartItem;
    });
  }

  return [ ...cartItems, { ...cartItemToAdd, quantity: 1 }]
};
