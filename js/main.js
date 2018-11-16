'use strict';

const templates = document.querySelectorAll(`template`);
const mainContainer = document.querySelector(`main`);

const arrowMarkup = `
  <div class="arrows__wrap">
  <style>
    .arrows__wrap {
      position: absolute;
      top: 95px;
      left: 70%;
      margin-left: -56px;
    }
    .arrows__btn {
      background: none;
      border: 2px solid black;
      padding: 5px 20px;
    }
  </style>
  <button type="button" class="arrows__btn"><-</button>
  <button type="button" class="arrows__btn">-></button>
  </div>
`;

document.body.insertAdjacentHTML(`beforeend`, arrowMarkup);

const navArrowBack = document.querySelectorAll(`.arrows__btn`)[0];
const navArrowNext = document.querySelectorAll(`.arrows__btn`)[1];

const screenNum = (function () {
  let privateCounter = 0;
  function step(val) {
    privateCounter += val;
  }
  return {
    showNext: () => {
      step(1);
    },
    showPrevious: () => {
      step(-1);
    },
    getValue: (array = []) => {
      if (privateCounter < 0) {
        privateCounter = array.length - 1;
      } else if (privateCounter > array.length - 1) {
        privateCounter = 0;
      }
      return privateCounter;
    }
  };
})();

const wrap = (it) => {
  const shadow = document.createElement(`div`);
  const content = it.content.cloneNode(true);
  shadow.appendChild(content);
  return shadow.cloneNode(true);
};


const goBack = (element, array) => {
  screenNum.showPrevious();
  showScreen(array, screenNum.getValue(element));
};

const goNext = (element, array) => {
  screenNum.showNext();
  showScreen(array, screenNum.getValue(element));
};

const handleButtonBack = (item, array) => {
  let buttonsBack = item.querySelector(`.back`);
  if (buttonsBack) {
    buttonsBack.addEventListener(`click`, () => {
      goBack(item, array);
    });
  }
};

const handleButtonNext = (item, array) => {
  const greetingNextButton = document.querySelector(`.greeting__continue`);
  if (greetingNextButton) {
    greetingNextButton.addEventListener(`click`, () => {
      goNext(item, array);
    });
  }
};

const showScreen = (array, index = 0) => {
  for (;mainContainer.firstChild;) {
    mainContainer.removeChild(mainContainer.firstChild);
  }
  for (let i = 0; i < array.length; i++) {
    if (array[i] === array[index]) {
      const template = wrap(array[index]);
      mainContainer.appendChild(template);
      handleButtonBack(template, array);
      handleButtonNext(template, array);
    }
  }
};

document.addEventListener(`keydown`, (event) => {
  switch (event.key) {
    case `ArrowLeft`:
      screenNum.showPrevious();
      showScreen(templates, screenNum.getValue(templates));
      break;
    case `ArrowRight`:
      screenNum.showNext();
      showScreen(templates, screenNum.getValue(templates));
      break;
  }
});

navArrowNext.addEventListener(`click`, () => {
  screenNum.showNext();
  showScreen(templates, screenNum.getValue(templates));
});

navArrowBack.addEventListener(`click`, () => {
  screenNum.showPrevious();
  showScreen(templates, screenNum.getValue(templates));
});

showScreen(templates, 1);
