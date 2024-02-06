async function getCartId() {
  try {
    const response = await getCartByEmail();
    console.log(response);
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
