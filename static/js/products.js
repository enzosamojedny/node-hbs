async function fetchProducts(page = 1, category = "") {
  const limit = 10;
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

    return { products, nextPageLink, prevPageLink, currentPage };
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
  const productsContainer = document.getElementById("products-container");
  productsContainer.innerHTML = "";
  console.log(products);
  products.products.forEach((product) => {
    const card = document.createElement("div");
    card.className = "card";
    card.style = "width: 18rem;";

    const img = document.createElement("img");
    img.src = product.thumbnail;
    img.className = "card-img-top";
    img.alt = product.title;

    const cardBody = document.createElement("div");
    cardBody.className = "card-body";

    cardBody.innerHTML = `
    <div class="card-row">
      <h5 class="card-title">${product.title}</h5>
      <p class="card-text">${product.category}</p>
      <p class="card-text">${product.description}</p>
      <p class="card-text">${"$ " + product.price}</p>
      <button type="button" class="btn btn-secondary"
        style="--bs-btn-padding-y: .25rem; --bs-btn-padding-x: .5rem; --bs-btn-font-size: .75rem;">
  Add to Cart
</button>
    </div>`;

    card.appendChild(img);
    card.appendChild(cardBody);

    productsContainer.appendChild(card);
  });
  const prevPageButton = document.getElementById("prevPageBtn");
  const prevPageAnchor = document.createElement("a");
  prevPageAnchor.className = "page-link";
  prevPageAnchor.innerHTML = "<";
  prevPageAnchor.href = `${products.prevPageLink}`;
  prevPageButton.appendChild(prevPageAnchor);

  const current = document.getElementById("currentPage");
  const createPageNumber = document.createElement("p");
  createPageNumber.className = "p-page-number";
  createPageNumber.innerHTML = `${products.currentPage}`;
  current.appendChild(createPageNumber);

  const nextPageButton = document.getElementById("nextPageBtn");
  const nextPageAnchor = document.createElement("a");
  nextPageAnchor.className = "page-link";
  nextPageAnchor.innerHTML = ">";
  nextPageAnchor.href = `${products.nextPageLink}`;
  nextPageButton.appendChild(nextPageAnchor);

  prevPageButton.addEventListener("click", (e) => {
    e.preventDefault();
    current.innerHTML = "";
    handlePageChange(products.currentPage - 1);
  });

  nextPageButton.addEventListener("click", (e) => {
    e.preventDefault();
    current.innerHTML = "";
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

window.onload = function () {
  init();
};
