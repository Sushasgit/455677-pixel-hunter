'use strict';

const templates = document.querySelectorAll(`template`);
const mainContainer = document.querySelector(`main`);
const START_SCREEN = 1;

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

const navArrows = document.querySelectorAll(`.arrows__btn`);

const screenNum = (function () {
  let privateCounter = 1;
  const step = (val) => {
    privateCounter += val;
  };
  return {
    showNext: () => {
      step(1);
    },
    showPrevious: () => {
      step(-1);
    },
    getValue: (elements = []) => {
      if (privateCounter < 0) {
        privateCounter = elements.length - 1;
      } else if (privateCounter > elements.length - 1) {
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

const goBack = (elements) => {
  screenNum.showPrevious();
  showScreen(elements, screenNum.getValue(elements));
};

const goNext = (elements) => {
  screenNum.showNext();
  showScreen(elements, screenNum.getValue(elements));
};

const handleButtonBack = (item, elements) => {
  let buttonBack = item.querySelector(`.back`);
  if (buttonBack) {
    buttonBack.addEventListener(`click`, () => {
      goBack(item, elements);
    });
  }
};

const handleButtonNext = (item, elements) => {
  const greetingNextButton = document.querySelector(`.greeting__continue`);
  if (greetingNextButton) {
    greetingNextButton.addEventListener(`click`, () => {
      goNext(item, elements);
    });
  }
};

const showScreen = (templatesArr, index = 0) => {
  for (;mainContainer.firstChild;) {
    mainContainer.removeChild(mainContainer.firstChild);
  }

  templatesArr.forEach((templateItem, templateIndex) => {
    if (templateIndex === index) {
      const template = wrap(templateItem);
      mainContainer.appendChild(template);
      handleButtonBack(template, templatesArr);
      handleButtonNext(template, templatesArr);
    }
  });
};

document.addEventListener(`keydown`, (event) => {
  switch (event.key) {
    case `ArrowLeft`:
      goBack(templates);
      break;
    case `ArrowRight`:
      goNext(templates);
      break;
  }
});

navArrows[0].addEventListener(`click`, () => {
  goNext(templates);
});

navArrows[1].addEventListener(`click`, () => {
  goBack(templates);
});

showScreen(templates, START_SCREEN);
