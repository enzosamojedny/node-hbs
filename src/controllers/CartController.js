const CartManagerMongoDB = require("../daos/managers/CartManagerMongoDB");
const cartManagerMongoDB = new CartManagerMongoDB();
const TicketManagerMongoDB = require("../daos/managers/TicketManagerMongoDB");
const ticketManagerMongoDB = new TicketManagerMongoDB();

const PostCart = async (req, res) => {
  try {
    const productDetails = req.body;
    console.log("product details", productDetails);
    if (!productDetails) {
      throw new Error("Product details not provided in the request body");
    }
    const addedProduct = await cartManagerMongoDB.addCart(productDetails);
    res.status(200).json({ product: addedProduct });
  } catch (error) {
    next(error);
  }
};

const GetCartId = async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) {
      throw new Error("UserID not provided in the request");
    }
    const userCart = await cartManagerMongoDB.getCartByEmail(userId);
    res.status(200).json({ cart: userCart });
  } catch (error) {
    next(error);
  }
};

//FIND CART BY USER ID
const PostUserCart = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      throw new Error("Missing data in request");
    }
    const findUserByEmail = await cartManagerMongoDB.getCartByEmail(email);
    console.log(findUserByEmail);
    res.status(200).json({ cart: findUserByEmail });
  } catch (error) {
    next(error);
  }
};

//DELETE 1 PRODUCT FROM CART
const DeleteProductFromCart = async (req, res) => {
  try {
    const { cartid, productid } = req.params;
    if (!cartid || !productid) {
      throw new Error("Missing data in request");
    }
    const deleteProductFromCart = cartManagerMongoDB.deleteProductFromCart(
      cartid,
      productid
    );
    res.status(200).json({ cart: deleteProductFromCart });
  } catch (error) {
    next(error);
  }
};

//UPDATE CART PRODUCT QUANTITY
const UpdateCartProductQuantity = async (req, res) => {
  try {
    const { cartid, productid } = req.params;
    if (!cartid || !productid) {
      throw new Error("Missing data in request");
    }
    const quantity = req.body.quantity;
    const updateCartProductQuantity =
      cartManagerMongoDB.updateCartProductQuantity(
        //* I DELETED DATA FROM HERE SO THAT ONLY THE QUANTITY IS UPDATED
        quantity
      );
    res.status(200).json({ cart: updateCartProductQuantity });
  } catch (error) {
    next(error);
  }
};

const UpdateCart = async (req, res) => {
  try {
    const { id } = req.params;
    const { cartToUpdate } = req.body;
    console.log(" CONT DATA", cartToUpdate);
    console.log(" CONT ID", id);
    if (!cartToUpdate) {
      throw new Error("Cart details not provided in the request body");
    }
    const updateCart = await cartManagerMongoDB.updateCart(id, cartToUpdate);
    res.status(200).json({ cart: updateCart });
  } catch (error) {
    next(error);
  }
};

// DELETES THE WHOLE CART
const DeleteCart = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteCart = await cartManagerMongoDB.deleteCart(id);
    res.status(200).json({ deleteCart });
  } catch (error) {
    next(error);
  }
};
// CREATES TICKET BY CART
const TicketByCart = async (req, res) => {
  try {
    const { cartId } = req.params;
    const userData = req.body;
    if (!userData) {
      return res
        .status(400)
        .json({ message: "Invalid userData in the request body" });
    }

    for (const product of userData.products) {
      if (product.stock < product.quantity) {
        return res
          .status(500)
          .json(`Insufficient stock for product: ${product.name}`);
      }
    }

    console.log(cartId);
    const createTicketByCart = await ticketManagerMongoDB.createTicket(
      cartId,
      userData
    );
    await cartManagerMongoDB.deleteCart(cartId);
    res.status(200).json({ createTicketByCart });
  } catch (error) {
    next(error);
  }
};
module.exports = {
  PostCart,
  GetCartId,
  PostUserCart,
  DeleteProductFromCart,
  UpdateCartProductQuantity,
  DeleteCart,
  UpdateCart,
  cartManagerMongoDB,
  TicketByCart,
};
