async function checkJwtToken() {
  try {
    const response = await axios.get("/api/session/current", {
      withCredentials: true,
    });
    if (response.data.payload !== false) {
      const data = response.data;
      console.log("authenticated", data);
    } else {
      console.log("not authenticated");
    }
  } catch (error) {
    console.error("no authentication", error);
  }
}
