import {render} from '../utils';

const mainElement = document.querySelector(`#main`);
// import secondGameScreen from './game-screen-2.js';
// import greetingScreen from './greeting.js';
import {oneImageTemplate, twoImageTemplate, threeImageTemplate} from './game-templates.js';
// const FIRST_QUESTION = `question1`;
// const SECOND_QUESTION = `question2`;
import {images} from './game-screen/data.js';

const INITIAL_GAME = {
  answers: [],
  lives: 0,
  level: 0,
};

const questions = document.querySelectorAll(`.game`);

const handletypeofQuestion = (question) => {
  switch (question.type) {
    case `oneImage`:
      return oneImageTemplate(question);
    case `twoImage`:
      return twoImageTemplate(question);
    case `threeImage`:
      return threeImageTemplate(question);
  }
  return null;
};

const getRandomQuestions = (questions) => {
  const shuffled = questions.sort(() => 0.5 - Math.random());
  return shuffled.slice(1, 11);
};

let renderQuestions = (questions) => {
  let output = [];
  getRandomQuestions(questions).forEach((currentQuestion) => {
    output.push(
        handletypeofQuestion(currentQuestion.type)
    );
  });
  mainElement.innerHTML = output.join(``);
};

const showQuestion = (n) => {
  let currentSlide = INITIAL_GAME.level;
  questions[currentSlide].classList.remove(`active-slide`);
  questions[n].classList.add(`active-slide`);
  currentSlide = n;

  
}


const element = render(handletypeofQuestion(images[Math.floor(Math.random() * images.length)]));

// const radiosButtons = element.querySelectorAll(`input[type="radio"]`);
// const goBackBtn = element.querySelector(`.back`);

// const answer = {};

// radiosButtons.forEach((radio) => {
//   radio.addEventListener(`change`, () => {
//     saveAnswers(radio.name, radio.value);
//   });
// });

// const saveAnswers = (answerGroup, question) => {
//   answer[answerGroup] = question;
//   if (answer.hasOwnProperty(FIRST_QUESTION) && answer.hasOwnProperty(SECOND_QUESTION)) {
//     changeScreen(secondGameScreen);
//   }
//   return answer;
// };

// goBackBtn.addEventListener(`click`, () => {
//   changeScreen(greetingScreen);
// });
renderQuestions(images);
export default element;
