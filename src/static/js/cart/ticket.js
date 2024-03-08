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
// cuando hago click en el button, envia via PUT product._id y product.quantity a la ruta /api/products
// al backend y actualiza el valor de la cantidad por req.body
//? tengo que mandar un array de products con esta sintaxis:  [{ _id: 'product1', quantity: 10 }, { _id: 'product2', quantity: 5 }]
