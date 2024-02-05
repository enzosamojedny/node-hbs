const logoutBtn = document.getElementById("logout-btn");

async function logout() {
  try {
    const response = await axios.delete("/api/logout");
    if (response.status >= 200 && response.status < 300) {
      setTimeout(() => {
        window.location.href = "/login";//not redirecting
      }, 3000);
    } else {
      console.error("Logout failed");
    }
  } catch (error) {
    console.error("Error during logout:", error);
    throw new Error("Logout failed", error);
  }
}

logoutBtn.addEventListener("click", async () => {
  try {
    await logout();
  } catch (error) {
    console.error(error.message);
  }
});
