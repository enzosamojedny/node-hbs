function Counter(product) {
  const increase = document.getElementById("increase");
  const decrease = document.getElementById("decrease");
  const quantity_span = document.getElementById("quantity-span");
  const priceDisplay = document.getElementById("amount");
  const button = document.getElementById("cart-btn");
  let currentValue = 0;
  let currentPrice = parseInt(product.price, 10);

  function updateDisplay() {
    let totalPrice = currentValue * currentPrice;
    quantity_span.textContent = currentValue;
    priceDisplay.textContent = `$${totalPrice.toFixed(2)}`;
  }
  updateDisplay();
  increase.addEventListener("click", function () {
    currentValue += 1;
    updateDisplay();
  });

  decrease.addEventListener("click", function () {
    currentValue = Math.max(currentValue - 1, 0);
    updateDisplay();
  });

  button.addEventListener("click", function () {
    addItemsToCart(product._id, currentValue, currentPrice, product.title);
  });
}

async function addItemsToCart(
  productId,
  currentValue,
  currentPrice,
  productTitle
) {
  //POST data
  try {
    if (currentValue > 1) {
      const userId = await getUserData();
      console.log("function returns userId", userId);
      if (userId) {
        const productData = {
          userId: userId,
          products: [
            {
              productId: productId,
              price: currentPrice,
              name: productTitle,
              quantity: currentValue,
            },
          ],
        };
        const response = await axios.post(`/api/carts`, productData);
        console.log(response.data);
      }
    }
  } catch (error) {
    console.error("Error during POST request:", error.message);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  function renderProductDetails(product) {
    const productDetails = product[0];
    const h2 = document.getElementById("productTitle");

    const price = document.getElementById("productPrice");
    const description = document.getElementById("productDescription");
    const wrapper = document.getElementById("detail-wrapper");

    h2.textContent = productDetails.title;
    price.textContent = `$${productDetails.price}`;
    description.textContent = productDetails.description;

    const button = document.getElementById("cart-btn");
    button.className = "btn btn-primary";
    button.textContent = "Add to cart";

    const carouselInner = document.querySelector(".carousel-inner");
    const carouselIndicators = document.querySelector(".carousel-indicators");

    productDetails.images.forEach((image, index) => {
      const carouselItem = document.createElement("div");
      carouselItem.className = `carousel-item ${index === 0 ? "active" : ""}`;

      const img = document.createElement("img");
      img.src = image;
      img.alt = image.alt;
      img.className = "d-block w-100";

      carouselItem.appendChild(img);
      carouselInner.appendChild(carouselItem);
      const indicator = document.createElement("button");
      indicator.setAttribute("type", "button");
      indicator.setAttribute("data-bs-target", "#carouselExampleInterval");
      indicator.setAttribute("data-bs-slide-to", index.toString());
      indicator.className = index === 0 ? "active" : "";
      indicator.setAttribute("aria-current", index === 0 ? "true" : "false");
      indicator.setAttribute("aria-label", `Slide ${index + 1}`);
      carouselIndicators.appendChild(indicator);
    });
    wrapper.appendChild(h2);
    wrapper.appendChild(price);
    wrapper.appendChild(description);
  }

  async function productByCode() {
    const productCode = window.location.pathname.split("/").pop();
    await axios
      .get(`/api/product/detail/code/${productCode}`)
      .then((response) => {
        const data = response.data;
        console.log(data.product);
        Counter(data.product[0]);
        renderProductDetails(data.product);
      });
  }
  productByCode();
});
{
}
