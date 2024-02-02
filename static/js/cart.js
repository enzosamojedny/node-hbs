document.addEventListener("DOMContentLoaded", async function getCart() {
  try {
    const userId = await getUserData();
    console.log(userId);

    try {
      const response = await axios.post("/api/carts/usercart", {
        userId: userId,
      });
      const userCart = response.data.cart;
      console.log(userCart);
    } catch (error) {
      throw new Error("Error while retrieving user cart");
    }
  } catch (error) {
    throw new Error("Error while retrieving user cart");
  }
});
