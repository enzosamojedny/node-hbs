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

  async function checkJwtToken() {
    try {
      const response = await axios.get("/api/session/current", {
        withCredentials: true,
      });
      if (response.status === 200) {
        const data = response.data;
        console.log("authenticated", data);
      } else {
        console.log("not authenticated");
      }
    } catch (error) {
      console.error("no authentication", error);
    }
  }
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
