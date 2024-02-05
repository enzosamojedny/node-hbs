document.addEventListener("DOMContentLoaded", function () {
  function searchBar() {
    const form = document.getElementById("searchForm");
    form.addEventListener("submit", async function (event) {
      event.preventDefault();
      const input = document.getElementById("searchInput");
      const searchTerm = input.value.trim();

      if (searchTerm !== "") {
        try {
          const response = await axios.post("/api/products/search", {
            title: searchTerm,
          });

          console.log(response.data);
          // Display products here

          // Reset the search input field
          input.value = "";
        } catch (error) {
          console.error("Error:", error);
        }
      }
    });
  }

  searchBar();


  checkJwtToken();

  const toastTrigger = document.getElementById("liveToastBtn");
  const toastLiveExample = document.getElementById("liveToast");

  if (toastTrigger) {
    const toastBootstrap =
      bootstrap.Toast.getOrCreateInstance(toastLiveExample);
    toastTrigger.addEventListener("click", () => {
      toastBootstrap.show();
    });
  }
});
