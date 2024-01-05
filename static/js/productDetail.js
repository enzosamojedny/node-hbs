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
        renderProductDetails(data.product);
      });
  }
  productByCode();
});
