document.addEventListener("DOMContentLoaded", function () {
  function searchBar() {
    const input = document.getElementById("searchInput");

    if (input) {
      input.addEventListener("input", function () {
        const searchTerm = input.value.trim();
        const searchEvent = new CustomEvent("searchChanged", {
          detail: searchTerm,
        });
        document.dispatchEvent(searchEvent);
      });
    }
  }

  searchBar();
});
