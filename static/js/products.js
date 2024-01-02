async function fetchProducts(page = 1, category = "") {
  const limit = 13;
  const sort = "asc";
  const categoryQuery = category ? `&category=${category}` : "";

  try {
    const response = await fetch(
      `/api/products?page=${page}&limit=${limit}&sort=${sort}${categoryQuery}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    if (!data.payload) {
      throw new Error('The data received does not contain "payload".');
    }

    const { payload: products, nextLink, prevLink, page: currentPage } = data;

    const nextPageLink = nextLink && new URL(nextLink, window.location.origin);
    const prevPageLink = prevLink && new URL(prevLink, window.location.origin);

    return { products: products, nextPageLink, prevPageLink, currentPage };
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
}

async function handleCategoryChange(category) {
  try {
    const productsData = await fetchProducts(1, category);
    renderProducts(productsData);
  } catch (error) {
    console.error("Error handling category change:", error);
  }
}

async function handlePageChange(page) {
  try {
    const productsData = await fetchProducts(page);
    renderProducts(productsData);
  } catch (error) {
    console.error("Error handling page change:", error);
  }
}

function renderProducts(products) {
  //!append the img to row
  products.products.forEach((product) => {
    const wrapper = document.getElementById("wrapper");
    const productsContainer = document.createElement("div");
    productsContainer.id = "products-container";
    // productsContainer.innerHTML = "";
    productsContainer.className = "card  mb-3";
    productsContainer.style.paddingLeft = "0";
    const row = document.createElement("div");

    row.className = "card-body d-flex flex-row align-items-center";

    const img = document.createElement("img");
    img.src = product.thumbnail;
    img.className = "card img";
    img.alt = product.title;
    row.appendChild(img);

    const col = document.createElement("div");
    col.className = "ml-2";

    col.innerHTML = `
      <h5 class="card-title">${product.title}</h5>
      <p class="card-text">${product.category}</p>
      <p class="card-text">${"$ " + product.price}</p>
      <button type="button" class="btn btn-primary">
        Add to Cart
      </button>
    `;

    row.appendChild(col);
    productsContainer.appendChild(row);
    wrapper.appendChild(productsContainer);
  });

  const prevPageButton = document.getElementById("prevPageBtn");
  const prevPageAnchor = document.getElementById("prev-a");
  prevPageAnchor.href = `${products.prevPageLink}`;

  // const current = document.getElementById("currentPage");
  // const createPageNumber = document.createElement("p");
  // createPageNumber.className = "p-page-number";
  // createPageNumber.innerHTML = `${products.currentPage}`;
  // current.appendChild(createPageNumber);

  const nextPageButton = document.getElementById("nextPageBtn");
  const nextPageAnchor = document.getElementById("next-a");
  nextPageAnchor.href = `${products.nextPageLink}`;

  prevPageButton.addEventListener("click", (e) => {
    e.preventDefault();
    handlePageChange(products.currentPage - 1);
  });
  nextPageButton.addEventListener("click", (e) => {
    e.preventDefault();
    handlePageChange(products.currentPage + 1);
  });
  // document
  //   .getElementById("categoryFilter")
  //   .addEventListener("change", function (e) {
  //     handleCategoryChange(e.target.value);
  //   });
}

async function init() {
  try {
    const products = await fetchProducts();
    renderProducts(products);
  } catch (error) {
    console.error("Failed to initialize:", error);
  }
}
document.addEventListener("searchChanged", function (event) {
  const searchTerm = event.detail;

  console.log("Received search term:", searchTerm);

  handleCategoryChange(searchTerm);
});
window.onload = function () {
  init();
};
