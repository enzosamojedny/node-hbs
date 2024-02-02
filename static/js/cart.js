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

  function createCard() {
    const cardBody = document.querySelector(".card-body");

    const cartWrapper = document.createElement("div");
    cartWrapper.classList.add("row", "cart-wrapper");
    const cardContainer = document.createElement("div");
    cardContainer.classList.add("col");

    const flexContainer = document.createElement("div");
    flexContainer.classList.add("d-flex", "justify-content-between");

    const leftContainer = document.createElement("div");
    leftContainer.classList.add("d-flex", "flex-row", "align-items-center");

    const imgContainer = document.createElement("div");
    const img = document.createElement("img");
    img.src =
      "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-shopping-carts/img1.webp";
    img.classList.add("img-fluid", "rounded-3");
    img.alt = "Shopping item";
    img.style.width = "65px";

    const textContainer = document.createElement("div");
    textContainer.classList.add("ms-3");

    const title = document.createElement("h5");
    title.textContent = "Iphone 11 pro";

    const description = document.createElement("p");
    description.classList.add("small", "mb-0");
    description.textContent = "256GB, Navy Blue";

    imgContainer.appendChild(img);
    textContainer.appendChild(title);
    textContainer.appendChild(description);
    leftContainer.appendChild(imgContainer);
    leftContainer.appendChild(textContainer);

    const rightContainer = document.createElement("div");
    rightContainer.classList.add("d-flex", "flex-row", "align-items-center");

    const quantityContainer = document.createElement("div");
    quantityContainer.style.width = "50px";

    const quantity = document.createElement("h5");
    quantity.classList.add("fw-normal", "mb-0");
    quantity.textContent = "2";

    const priceContainer = document.createElement("div");
    priceContainer.style.width = "80px";

    const price = document.createElement("h5");
    price.classList.add("mb-0");
    price.textContent = "$900";

    const deleteLink = document.createElement("a");
    deleteLink.href = "#!";
    deleteLink.style.color = "#cecece";
    const deleteIcon = document.createElement("i");
    deleteIcon.classList.add("fas", "fa-trash-alt");

    quantityContainer.appendChild(quantity);
    priceContainer.appendChild(price);
    deleteLink.appendChild(deleteIcon);
    rightContainer.appendChild(quantityContainer);
    rightContainer.appendChild(priceContainer);
    rightContainer.appendChild(deleteLink);

    flexContainer.appendChild(leftContainer);
    flexContainer.appendChild(rightContainer);
    cardContainer.appendChild(flexContainer);
    cartWrapper.appendChild(cardContainer);
    cardBody.appendChild(cartWrapper);
  }
  createCard();

  /////////////////////////////////////////////////////////

  function createTotalCard() {
    const cardBody = document.querySelector(".card-body");

    const cartWrapper = document.createElement("div");
    cartWrapper.classList.add("row", "cart-wrapper");
    const cardContainer = document.createElement("div");
    cardContainer.classList.add("col");
    //!
    const totalCardDiv = document.createElement("div");
    totalCardDiv.classList.add("card", "mt-3");

    const flexContainer = document.createElement("div");
    flexContainer.classList.add("d-flex", "justify-content-between");

    const leftContainer = document.createElement("div");
    leftContainer.classList.add("d-flex", "flex-row", "align-items-center");

    const textContainer = document.createElement("div");
    textContainer.classList.add("ms-3");

    const title = document.createElement("h5");
    title.textContent = "Total";

    textContainer.appendChild(title);
    leftContainer.appendChild(textContainer);

    const rightContainer = document.createElement("div");
    rightContainer.classList.add("d-flex", "flex-row", "align-items-center");

    const priceContainer = document.createElement("div");
    priceContainer.style.width = "80px";

    const price = document.createElement("h5");
    price.classList.add("mb-0");
    price.textContent = "$1799";

    priceContainer.appendChild(price);
    rightContainer.appendChild(priceContainer);

    flexContainer.appendChild(leftContainer);
    flexContainer.appendChild(rightContainer);
    totalCardDiv.appendChild(flexContainer);

    cardContainer.appendChild(totalCardDiv);
    cartWrapper.appendChild(cardContainer);
    cardBody.appendChild(cartWrapper);
  }

  createTotalCard();
});
