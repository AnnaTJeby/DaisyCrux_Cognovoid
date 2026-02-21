const API_BASE = "https://daisycrux-cognovoid.onrender.com";

// =====================
// CHAT FUNCTION
// =====================
function sendMessage() {

  const mood = document.getElementById("mood").value;
  const scenario = document.getElementById("scenario").value;
  const chatBox = document.getElementById("chatBox");

  if (!mood || !scenario) {
    alert("Please select mood and describe your situation.");
    return;
  }

  // Show user message
  const userMsg = document.createElement("div");
  userMsg.className = "message user";
  userMsg.innerText = "Mood: " + mood + "\n" + scenario;
  chatBox.appendChild(userMsg);

  // Bot loading message
  const botMsg = document.createElement("div");
  botMsg.className = "message bot";
  botMsg.innerText = "Thinking clearly...";
  chatBox.appendChild(botMsg);

  fetch(API_BASE + "/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      action: "chat",
      message: scenario
    })
  })
  .then(res => res.json())
  .then(data => {
    botMsg.innerText = data.reply || "No reply from server.";
  })
  .catch(error => {
    botMsg.innerText = "Server error. Check backend.";
    console.error(error);
  });
}


// =====================
// PREDICT FUNCTION
// =====================
function sendPrediction(data) {
  fetch(API_BASE + "/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      action: "predict",
      ...data
    })
  })
  .then(res => res.json())
  .then(result => {
    console.log("Prediction:", result);
  })
  .catch(err => console.error(err));
}


// =====================
// QUIZ NAVIGATION
// =====================
function startQuiz() {
  window.location.href = "quiz.html";
}