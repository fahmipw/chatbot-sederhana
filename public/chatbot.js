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
  const div = document.createElement("div");
  div.classList.add("message", sender);
  div.textContent = `${sender === 'user' ? 'Kamu' : 'Bot'}: ${text}`;
  messages.appendChild(div);
  messages.scrollTop = messages.scrollHeight;
}

async function getGPTResponse(message) {
  try {
    const res = await fetch("/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });

    const data = await res.json();
    return data.reply;
  } catch (err) {
    return "❌ Gagal menghubungi server.";
  }
}
