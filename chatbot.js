const chatForm = document.getElementById("chat-form");
const userInput = document.getElementById("user-input");
const messages = document.getElementById("messages");

chatForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const text = userInput.value;
  appendMessage("user", text);
  userInput.value = "";
  const response = await getGPTResponse(text);
  appendMessage("bot", response);
});

function appendMessage(sender, text) {
  const messageDiv = document.createElement("div");
  messageDiv.classList.add("message", sender);
  messageDiv.textContent = text;
  messages.appendChild(messageDiv);
  messages.scrollTop = messages.scrollHeight;
}

async function getGPTResponse(message) {
  const response = await fetch("/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message })
  });

  const data = await response.json();
  return data.reply;
}

