async function getCartId() {
  try {
    const response = await getCartByEmail();
    const cartId = response.cart.cart._id;
    console.log(cartId);
    const cartData = response.cart.cart;
    const getCartById = await axios.post(`/api/${cartId}/purchase`, cartData);

    return getCartById.data;
  } catch (error) {
    throw new Error(`Could not get cart by email: ${error.message}`);
  }
}
async function getTicket(data) {
  // cuando hago click en el button, envia via PUT product._id y product.quantity a la ruta /api/products
  // al backend y actualiza el valor de la cantidad por req.body
  //? tengo que mandar un array de products con esta sintaxis:  [{ _id: 'product1', quantity: 10 }, { _id: 'product2', quantity: 5 }]
}
getCartId();
