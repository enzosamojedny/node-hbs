async function getCartByEmail() {
  let userEmail;
  let response;
  try {
    userEmail = await getUserData();
    console.log(userEmail);

    response = await axios.post("/api/carts/usercart", {
      email: userEmail,
    });

    return response.data;
  } catch (error) {
    throw new Error(`Error in getCartByEmail: ${error.message}`);
  }
}
