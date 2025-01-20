const fetch = require("node-fetch");
const { Readable } = require("readable-stream");

("https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent");

const chatContainer = document.getElementById("chat-container");
const chatMessages = document.getElementById("chat-messages");
const chatInput = document.getElementById("chat-input");
const chatSendButton = document.getElementById("chat-send");

let chatVisible = false;

chatInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    const userInput = chatInput.value.trim();
    if (userInput) {
      addChatMessage("You", userInput);
      sendChatMessage(userInput);
      chatInput.value = "";
    }
  }
});

chatSendButton.addEventListener("click", () => {
  const userInput = chatInput.value.trim();
  if (userInput) {
    addChatMessage("You", userInput);
    sendChatMessage(userInput);
    chatInput.value = "";
  }
});

function addChatMessage(sender, message) {
  const messageContainer = document.createElement("div");
  messageContainer.classList.add("chat-message-container");
  const messageHeader = document.createElement("div");
  messageHeader.classList.add("chat-message-header");
  messageHeader.textContent = sender + ":";
  const messageBody = document.createElement("div");
  messageBody.classList.add("chat-message-body");
  messageBody.textContent = message;
  messageContainer.appendChild(messageHeader);
  messageContainer.appendChild(messageBody);
  chatMessages.appendChild(messageContainer);
  chatContainer.scrollTop = chatContainer.scrollHeight;
}

function sendChatMessage(message) {
  const loadingElement = document.getElementById("loading");
  loadingElement.style.display = "block";

  const apiKey = "AIzaSyDT0arxVgWWVsd_ZHLRKMYf2ldktvtg4SE";
  const endpoint =
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=" +
    apiKey;

  const requestData = {
    contents: [
      {
        role: "user",
        parts: [
          { text: "Pretend you're a snowman and stay in character for each" },
        ],
      },
      {
        role: "model",
        parts: [{ text: "Hello! It's so cold! Isn't that great?" }],
      },
      {
        role: "user",
        parts: [{ text: message }],
      },
    ],
  };

  try {
    const response = fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    });

    if (!response.ok) {
      throw new Error("Failed to generate content");
    }

    const stream = Readable.from(response.body);
    const decoder = new TextDecoder("utf-8");
    let botResponse = "";

    for (const chunk of stream) {
      const decodedValue = decoder.decode(chunk);
      try {
        const responseObj = JSON.parse(decodedValue);
        const textResponse = responseObj.candidates[0].content.parts[0].text;
        botResponse += textResponse;
      } catch (error) {
        console.error(error);
        botResponse = "Sorry, I was unable to process your request.";
      }
    }

    return botResponse;
  } catch (error) {
    console.error(error);
    return "Sorry, I was unable to process your request.";
  }
}
