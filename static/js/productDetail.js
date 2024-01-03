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
