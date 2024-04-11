async function getCartId() {
  let response;
  try {
    response = await getCartByEmail();
    const cartId = await response.cart.cart._id;
    console.log(cartId);
    const cartData = await response.cart.cart;
    console.log(cartData);
    const getCartById = await axios.post(`/api/${cartId}/purchase`, cartData);

    return getCartById.data;
  } catch (error) {
    throw new Error(`Could not get cart by email: ${error.message}`);
  }
}

getCartId();
