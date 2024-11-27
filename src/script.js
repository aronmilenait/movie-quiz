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
  }

  start() {
    this.questionStateElement.innerText = `Question ${
      this.currentQuestion + 1
    } of ${this.questions.length}`;

    this.questionElement.innerText = questions[this.currentQuestion];

    this.moviesFirstQuestion.forEach((movie) => {
      const movieElement = document.createElement("div");
      movieElement.classList.add("movie");
      movieElement.innerHTML = `
        <img src="./assets/${movie.image}" alt="${movie.title}" />
      `;
      movieElement.addEventListener("click", () => {
        this.nextQuestion(movie.title);
      });
      this.quizContainerElement.appendChild(movieElement);
    });
  }

  nextQuestion(movieTitle) {
    if (this.currentQuestion + 1 === this.questions.length) {
      console.log("You have reached the end of the quiz");
      return;
    }

    this.currentQuestion++;

    this.questionStateElement.innerText = `Question ${
      this.currentQuestion + 1
    } of ${this.questions.length}`;

    this.questionElement.innerText = questions[this.currentQuestion];

    this.quizContainerElement.innerHTML = "";

    const recommendationsToPrint = this.findRecommendations(movieTitle);

    recommendationsToPrint.movies.forEach(
      (movie) => {
        const movieElement = document.createElement("div");
        movieElement.classList.add("movie");
        movieElement.innerHTML = `
            <img src="./assets/${movie.image}" alt="${movie.title}" />
        `;
        this.createEventListeners(movieElement, movie.url, movie.title);
        this.quizContainerElement.appendChild(movieElement);
      }
    );
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
        this.modalButtonElement.href = url;
      });
      return;
    }

    movieElement.addEventListener("click", () => {
      this.nextQuestion(movieTitle);
    });
  }
}

new MovieRecommender(moviesFirstQuestion, recommendations, questions).start();
