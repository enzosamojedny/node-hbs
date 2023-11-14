const ul = document.querySelector("#productList");
document.querySelector("#productButton").addEventListener("click", () => {
  const input = document.querySelector("#productInput");
  if (input && input.value) {
    socket.emit("message", input.value);
    input.value = "";
  }
});
socket.on("messages", (data) => {
  if (data.length > 0) {
    const lastMessage = data[data.length - 1];
    const liLastMessage = document.createElement("li");
    liLastMessage.innerHTML = lastMessage;
    ul.appendChild(liLastMessage);
  }
});
