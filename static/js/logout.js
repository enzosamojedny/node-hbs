const logoutBtn = document.getElementById("logout-btn");

async function logout() {
  try {
    await axios.delete("/api/logout");
  } catch (error) {
    window.location.href = "/login";
  }
}

logoutBtn?.addEventListener("click", async () => {
  try {
    await logout();
  } catch (error) {
    console.error(error.message);
  }
});
