function Counter(product) {
  const increase = document.getElementById("increase");
  const input = document.getElementById("quantity-input");
  const priceDisplay = document.getElementById("amount");
  input.value = 0;
  priceDisplay.textContent = "$0.00";

  increase.addEventListener("click", function () {
    let currentValue = parseInt(input.value, 10);
    let currentPrice = parseInt(product.price, 10);

    if (!isNaN(currentValue)) {
      input.value = currentValue + 1;
      let totalPrice = (currentValue + 1) * currentPrice;
      priceDisplay.textContent = `$${totalPrice.toFixed(2)}`;
    } else {
      input.value = 1;
      priceDisplay.textContent = `$${product.price.toFixed(2)}`;
    }
  });
  decrease.addEventListener("click", function () {
    let currentValue = parseInt(input.value, 10);
    let currentPrice = parseInt(product.price, 10);

    if (!isNaN(currentValue)) {
      input.value = Math.max(currentValue - 1, 0);
      let totalPrice = Math.max((currentValue - 1) * currentPrice, 0);
      priceDisplay.textContent = `$${totalPrice.toFixed(2)}`;
    } else {
      input.value = 1;
      priceDisplay.textContent = `$${product.price.toFixed(2)}`;
    }
  });
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
