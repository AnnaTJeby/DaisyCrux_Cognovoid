const quizData = [
  {
    question: "How many hours did you sleep last night?",
    options: ["< 4 hours", "4-6 hours", "6-8 hours", "8+ hours"]
  },
  {
    question: "How many hours is your screen time today?",
    options: ["< 2 hrs", "2-4 hrs", "4-6 hrs", "6+ hrs"]
  },
  {
    question: "How do you feel mentally right now?",
    options: ["Sharp 😎", "Okay 🙂", "Tired 😴", "Overwhelmed 😵"]
  },
  {
    question: "When do you feel most distracted?",
    options: ["Morning", "Afternoon", "Night", "Always"]
  }
];

let currentQuestion = 0;
let answers = [];

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("nextBtn");
const progressBar = document.getElementById("progress-bar");

loadQuestion();

function loadQuestion() {
  nextBtn.disabled = true;
  optionsEl.innerHTML = "";

  const q = quizData[currentQuestion];
  questionEl.innerText = q.question;

  q.options.forEach(option => {
    const btn = document.createElement("button");
    btn.innerText = option;
    btn.onclick = () => selectAnswer(btn, option);
    optionsEl.appendChild(btn);
  });

  updateProgress();
}

function selectAnswer(button, answer) {
  document.querySelectorAll(".options button").forEach(btn => {
    btn.classList.remove("selected");
  });

  button.classList.add("selected");
  answers[currentQuestion] = answer;
  nextBtn.disabled = false;
}

nextBtn.onclick = () => {
  currentQuestion++;

  if (currentQuestion < quizData.length) {
    loadQuestion();
  } else {
    localStorage.setItem("cognovoidAnswers", JSON.stringify(answers));
    window.location.href = "result.html";
  }
};

function updateProgress() {
  const percent = ((currentQuestion + 1) / quizData.length) * 100;
  progressBar.style.width = percent + "%";
}