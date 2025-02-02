// Action to login
export const login = (userName) => ({
  type: "LOGIN",
  payload: { userName },
});

// Action to logout
export const logout = () => ({
  type: "LOGOUT",
});

// Action to add product to cart
export const addToCart = (product) => (dispatch, getState) => {
  const state = getState();

  // Check if the product already exists in the cart
  const existingProduct = state.cart.items.find(
    (item) => item.id === product.id
  );

  if (!existingProduct) {
    // If it's a new product, add it to the cart with quantity 1
    dispatch({
      type: "ADD_TO_CART",
      payload: { ...product, quantity: 1 },
    });
  }
  // If the product already exists, no action is taken (it is skipped)
};

// Action to update product quantity in cart
export const updateCartItemQuantity = (productId, amount) => ({
  type: "UPDATE_CART_ITEM_QUANTITY",
  payload: { id: productId, amount },
});

// Action to remove product from cart
export const removeFromCart = (productId) => ({
  type: "REMOVE_FROM_CART",
  payload: { id: productId },
});

// Action to clear the cart
export const clearCart = () => ({
  type: "CLEAR_CART",
});
