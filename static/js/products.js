async function fetchProducts() {
  try {
    const response = await fetch("/api/products");
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();

    if (!data.payload) {
      throw new Error('The data received does not contain "payload".');
    }

    const products = data.payload;
    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
}

function renderProducts(products) {
  const productsContainer = document.getElementById("products-container");
  productsContainer.innerHTML = "";
  products.forEach((product) => {
    const productCard = document.createElement("div");
    productCard.className = "product-card";
    productCard.innerHTML = `
        <div class="product-image">
          <img src="${product.thumbnail}" alt="${product.title}" />
        </div>
        <div class="product-info">
          <h5>${product.title}</h5>
          <p>${product.description}</p>
          <p>${product.price}</p>
        </div>
      `;
    productsContainer.appendChild(productCard);
  });
}

async function init() {
  try {
    const products = await fetchProducts();
    renderProducts(products);
  } catch (error) {
    console.error("Failed to initialize:", error);
  }
}

window.onload = function () {
  init();
};
