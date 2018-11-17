const templates = document.querySelectorAll(`template`);
const mainContainer = document.querySelector(`main`);
const START_SCREEN = 1;
const RULES_SCREEN = 2;

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
    setNext: () => {
      step(1);
    },
    setPrevious: () => {
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

const recreatedTemplates = [...templates].map((item) => wrap(item));

const goBack = (elements) => {
  screenNum.setPrevious();
  showScreen(elements, screenNum.getValue(elements));
};

const goNext = (elements) => {
  screenNum.setNext();
  showScreen(elements, screenNum.getValue(elements));
};

const handleButtonBack = (item, elements) => {
  const buttonBack = item.querySelector(`.back`);
  if (buttonBack) {
    buttonBack.addEventListener(`click`, () => {
      showScreen(elements, START_SCREEN);
    });
  }
};

const handleButtonNext = (item, elements) => {
  const greetingNextButton = item.querySelector(`.greeting__continue`);
  if (greetingNextButton && item) {
    greetingNextButton.addEventListener(`click`, () => {
      showScreen(elements, RULES_SCREEN);
    });
  }
};

const showScreen = (elements, index = 0) => {
  for (;mainContainer.firstChild;) {
    mainContainer.removeChild(mainContainer.firstChild);
  }
  mainContainer.appendChild(elements[index]);

  handleButtonBack(elements[index], elements);
  handleButtonNext(elements[index], elements);
};

document.addEventListener(`keydown`, (event) => {
  switch (event.key) {
    case `ArrowLeft`:
      goBack(recreatedTemplates);
      break;
    case `ArrowRight`:
      goNext(recreatedTemplates);
      break;
  }
});

navArrows[0].addEventListener(`click`, () => {
  goBack(recreatedTemplates);
});

navArrows[1].addEventListener(`click`, () => {
  goNext(recreatedTemplates);
});

showScreen(recreatedTemplates, START_SCREEN);

