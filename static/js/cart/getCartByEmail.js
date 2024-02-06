async function getCartByEmail() {
  try {
    const userEmail = await getUserData();
    console.log(userEmail);

    const response = await axios.post("/api/carts/usercart", {
      email: userEmail,
    });

    return response.data;
  } catch (error) {
    throw new Error(`Error in getCartByEmail: ${error.message}`);
  }
}
