const quizData = [
  {
      question: "What does MERN stand for in the MERN stack?",
      answers: ["A) MongoDB, Express, React, Node",
"B) MySQL, Express, React, Node",
"C) MongoDB, Express, Ruby, Node",
"D) MongoDB, Elasticsearch, React, Node",],
      correct: 1
  },
  {
      question: "Which of the following is the primary role of Node.js in the MERN stack?",
      answers: ["A) To interact with the database",
"B) To build the user interface",
"C) To handle HTTP requests and responses",
"D) To manage the front-end routing"],
      correct: 3
  },
  {
      question: "What is MongoDB in the MERN stack?",
      answers: ["A) A frontend JavaScript library",
"B) A backend web framework",
"C) A NoSQL database",
"D) A package manager for Node"],
      correct: 3
  }
];

let currentQuestion = 0;
let score = 0;

function loadQuestion() {
  const questionEl = document.getElementById('question');
  const optionsEl = document.querySelectorAll('#options div label');

  // Load current question and options
  questionEl.innerText = quizData[currentQuestion].question;
  optionsEl.forEach((label, index) => {
      label.querySelector('input').checked = false;
      label.innerHTML = `<input type="radio" name="answer" value="${index}"> ${quizData[currentQuestion].answers[index]}`;
  });

  // Show or hide navigation buttons
  document.getElementById('prev').style.display = currentQuestion === 0 ? 'none' : 'inline-block';
  document.getElementById('next').style.display = currentQuestion === quizData.length - 1 ? 'none' : 'inline-block';
  document.getElementById('submit').style.display = currentQuestion === quizData.length - 1 ? 'inline-block' : 'none';
}

function nextQuestion() {
  const selectedOption = document.querySelector('input[name="answer"]:checked');
  if (!selectedOption) {
      alert("Please select an answer!");
      return;
  }

  // Check answer and update score
  if (parseInt(selectedOption.value) === quizData[currentQuestion].correct) {
      score++;
  }

  // Move to next question
  currentQuestion++;
  loadQuestion();
}

function prevQuestion() {
  if (currentQuestion > 0) {
      currentQuestion--;
      loadQuestion();
  }
}

function showResult() {
  const selectedOption = document.querySelector('input[name="answer"]:checked');
  if (selectedOption && parseInt(selectedOption.value) === quizData[currentQuestion].correct) {
      score++;
  }

  // Display score without hiding quiz
  document.getElementById('result').innerText = `Your score: ${((score / quizData.length) * 100).toFixed(1)}%`;
  document.getElementById('result').style.display = 'block';
}

document.getElementById('next').addEventListener('click', nextQuestion);
document.getElementById('prev').addEventListener('click', prevQuestion);
document.getElementById('submit').addEventListener('click', showResult);

loadQuestion();
