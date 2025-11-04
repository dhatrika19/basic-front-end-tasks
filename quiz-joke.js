/* Quiz*/
const quizQuestions = [
  {
    question: "Which language is primarily used to structure web pages?",
    choices: ["CSS", "Python", "HTML", "SQL"],
    correct: 2
  },
  {
    question: "Which CSS property controls layout by placing items in rows/columns?",
    choices: ["grid-template-columns", "margin-top", "font-size", "color"],
    correct: 0
  },
  {
    question: "Which JavaScript method is used to retrieve an element by ID?",
    choices: ["getElementById", "querySelectorAll", "getElementsByTagName", "getById"],
    correct: 0
  },
  {
    question: "What does 'DOM' stand for in web development?",
    choices: ["Document Object Model", "Data Object Mapping", "Domain Object Model", "Document Output Manager"],
    correct: 0
  },
  {
    question: "Which HTML element is used to submit a form?",
    choices: ["<submit>", "<button type=\"submit\">", "<a>", "<input type=\"text\">"],
    correct: 1
  }
];

let currentQuestionIndex = 0;
const userAnswers = new Array(quizQuestions.length).fill(null);

document.addEventListener("DOMContentLoaded", () => {
  const quizContainer = document.getElementById("quizContainer");
  const prevBtn = document.getElementById("prevQ");
  const nextBtn = document.getElementById("nextQ");
  const submitQuizBtn = document.getElementById("submitQuiz");
  const quizResult = document.getElementById("quizResult");

  if (quizContainer) {
    function renderQuestion(index) {
      const q = quizQuestions[index];
      quizContainer.innerHTML = "";

      const card = document.createElement("div");
      card.className = "question-card";

      const title = document.createElement("div");
      title.className = "question-title";
      title.textContent = `Q${index + 1}. ${q.question}`;
      card.appendChild(title);

      const optionsWrap = document.createElement("div");
      optionsWrap.className = "options";

      q.choices.forEach((choiceText, i) => {
        const optionLabel = document.createElement("label");
        optionLabel.className = "option";

        const radio = document.createElement("input");
        radio.type = "radio";
        radio.name = "quizOption";
        radio.value = i;
        radio.checked = (userAnswers[index] === i);
        radio.addEventListener("change", () => {
          userAnswers[index] = i;
        });

        const span = document.createElement("span");
        span.textContent = choiceText;

        optionLabel.appendChild(radio);
        optionLabel.appendChild(span);
        optionsWrap.appendChild(optionLabel);
      });

      card.appendChild(optionsWrap);

      const progress = document.createElement("div");
      progress.className = "small-text";
      progress.style.marginTop = "8px";
      progress.textContent = `Question ${index + 1} of ${quizQuestions.length}`;
      card.appendChild(progress);

      quizContainer.appendChild(card);

      prevBtn.disabled = index === 0;
      nextBtn.disabled = index === quizQuestions.length - 1;
    }

    prevBtn?.addEventListener("click", () => {
      if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        renderQuestion(currentQuestionIndex);
      }
    });

    nextBtn?.addEventListener("click", () => {
      if (currentQuestionIndex < quizQuestions.length - 1) {
        currentQuestionIndex++;
        renderQuestion(currentQuestionIndex);
      }
    });

    submitQuizBtn?.addEventListener("click", () => {
      for (let i = 0; i < userAnswers.length; i++) {
        if (userAnswers[i] === null) {
          quizResult.textContent = `Please answer all questions before submitting. (Question ${i + 1} unanswered)`;
          quizResult.style.background = "#fff7f7";
          quizResult.style.color = "#8a1f1f";
          return;
        }
      }

      let score = 0;
      for (let i = 0; i < quizQuestions.length; i++) {
        if (userAnswers[i] === quizQuestions[i].correct) score++;
      }

      const percent = Math.round((score / quizQuestions.length) * 100);
      quizResult.innerHTML = `You scored ${score} / ${quizQuestions.length} (${percent}%). ` +
        (percent >= 80 ? "Great job!" : percent >= 50 ? "Nice effort!" : "Keep practicing!");
      quizResult.style.background = percent >= 80 ? "linear-gradient(180deg,#f0fff6,#e6fff0)" : "#fff7f7";
      quizResult.style.color = percent >= 80 ? "#0b5e33" : "#8a1f1f";
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight") nextBtn?.click();
      if (e.key === "ArrowLeft") prevBtn?.click();
    });

    renderQuestion(currentQuestionIndex);
  }

  /* SlideShow */

  /* Joke API */
  const getJokeBtn = document.getElementById("getJokeBtn");
  const getMultipleBtn = document.getElementById("getMultipleBtn");
  const jokeDisplay = document.getElementById("jokeDisplay");
  const apiStatus = document.getElementById("apiStatus");

  if (getJokeBtn && getMultipleBtn) {
    function setApiStatus(msg, important = false) {
      apiStatus.textContent = msg;
      apiStatus.style.color = important ? "#164" : "#63738a";
    }

    async function fetchSingleJoke() {
      setApiStatus("Fetching a fresh joke...");
      jokeDisplay.textContent = "";
      try {
        const res = await fetch("https://official-joke-api.appspot.com/random_joke");
        if (!res.ok) throw new Error("Network response not OK");
        const data = await res.json();
        jokeDisplay.innerHTML = `<strong>${escapeHtml(data.setup)}</strong><br/><em>${escapeHtml(data.punchline)}</em>`;
        setApiStatus("Enjoy the joke!");
      } catch (err) {
        jokeDisplay.textContent = "Sorry — couldn't fetch a joke. Try again.";
        setApiStatus("Could not reach the joke API. Showing fallback message.", true);
        console.error("Joke fetch error:", err);
      }
    }

    async function fetchMultipleJokes(count = 5) {
      setApiStatus("Fetching multiple jokes...");
      jokeDisplay.textContent = "";
      try {
        const res = await fetch("https://official-joke-api.appspot.com/random_ten");
        if (!res.ok) throw new Error("Network response not OK");
        const data = await res.json();
        const list = document.createElement("ol");
        data.slice(0, count).forEach(j => {
          const li = document.createElement("li");
          li.innerHTML = `<strong>${escapeHtml(j.setup)}</strong> — <span>${escapeHtml(j.punchline)}</span>`;
          list.appendChild(li);
        });
        jokeDisplay.innerHTML = "";
        jokeDisplay.appendChild(list);
        setApiStatus(`Displayed ${count} jokes.`);
      } catch (err) {
        jokeDisplay.textContent = "Sorry — couldn't fetch jokes. Try again.";
        setApiStatus("Could not reach the joke API.", true);
        console.error("Jokes fetch error:", err);
      }
    }

    function escapeHtml(str) {
      if (!str) return "";
      return str.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
    }

    getJokeBtn.addEventListener("click", fetchSingleJoke);
    getMultipleBtn.addEventListener("click", () => fetchMultipleJokes(5));
    setApiStatus("Ready — click Get Joke.");
  }
});
