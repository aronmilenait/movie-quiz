import {
  moviesFirstQuestion,
  questions,
  recommendations,
} from "./recommendations.js";

class MovieRecommender {
  constructor(moviesFirstQuestion, recommendations, questions) {
    this.moviesFirstQuestion = moviesFirstQuestion;
    this.recommendations = recommendations;
    this.questions = questions;
    this.currentQuestion = 0;

    this.questionElement = document.getElementById("question");
    this.questionStateElement = document.getElementById("question-state");
    this.quizContainerElement = document.getElementById("quiz-container");
    this.modalElement = document.getElementById("modal");
    this.modalButtonElement = document.getElementById("modal-button");
    this.dotContainerElement = document.getElementById("dot-container");
  }

  start() {
    this.questionStateElement.innerText = `Question ${
      this.currentQuestion + 1
    } of ${this.questions.length}`;

    this.questionElement.innerText = questions[this.currentQuestion];

    this.questions.forEach((_, index) => {
      this.renderDot(index);
    });

    this.moviesFirstQuestion.forEach((movie) => {
      const movieElement = document.createElement("div");
      movieElement.classList.add("movie");
      movieElement.innerHTML = `
        <img src="./assets/${movie.image}" alt="${movie.title}" />
      `;
      movieElement.addEventListener("click", () => {
        this.selectDot(this.currentQuestion + 1);
        this.nextQuestion(movie.title);
      });
      this.quizContainerElement.appendChild(movieElement);
    });
    document.getElementById("dot-0").classList.add("dot-selected");
  }

  renderDot(index) {
    const dotElement = document.createElement("div");
    dotElement.id = `dot-${index}`;
    dotElement.classList.add("dot");
    this.dotContainerElement.appendChild(dotElement);
  }

  selectDot(dotIndex) {
    this.questions.forEach((_, index) => {
      const dotElement = document.getElementById(`dot-${index}`);
      dotElement.classList.remove("dot-selected");
    });
    document.getElementById(`dot-${dotIndex}`).classList.add("dot-selected");
  }

  nextQuestion(movieTitle) {
    if (this.currentQuestion + 1 === this.questions.length) {
      return;
    }

    this.currentQuestion++;

    this.questionStateElement.innerText = `Question ${
      this.currentQuestion + 1
    } of ${this.questions.length}`;

    this.questionElement.innerText = questions[this.currentQuestion];

    this.quizContainerElement.innerHTML = "";

    const recommendationsToPrint = this.findRecommendations(movieTitle);

    recommendationsToPrint.movies.forEach((movie) => {
      const movieElement = document.createElement("div");
      movieElement.classList.add("movie");
      movieElement.innerHTML = `
            <img src="./assets/${movie.image}" alt="${movie.title}" />
        `;
      this.createEventListeners(movieElement, movie.url, movie.title);
      this.quizContainerElement.appendChild(movieElement);
    });
  }

  findRecommendations(movieTitle) {
    return this.recommendations.find(
      (recommendation) => recommendation.title === movieTitle
    );
  }

  createEventListeners(movieElement, url, movieTitle) {
    if (this.currentQuestion + 1 === this.questions.length) {
      movieElement.addEventListener("click", () => {
        this.modalElement.classList.add("is-active");
        this.quizContainerElement.classList.add("hidden");
        this.modalButtonElement.href = url;
      });
      return;
    }

    movieElement.addEventListener("click", () => {
      this.selectDot(this.currentQuestion + 1);
      this.nextQuestion(movieTitle);
    });
  }
}

new MovieRecommender(moviesFirstQuestion, recommendations, questions).start();
