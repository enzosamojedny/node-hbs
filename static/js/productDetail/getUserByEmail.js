function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

async function getUserData() {
  try {
    const response = await axios.get("/api/session/current");
    const userData = response.data.payload.email;
    console.log("profiledata", userData);
    if (isValidEmail(userData)) {
      const getUserByEmail = await axios.post("/api/getuserbyemail", {
        email: userData,
      });
      return getUserByEmail.data.message;
    } else {
      console.error("Invalid email format");
    }
  } catch (error) {
    return null;
  }
}