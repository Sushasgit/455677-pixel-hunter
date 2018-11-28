const mainElement = document.querySelector(`#main`);

export const generateArray = (length, time, isRight) => {
  const arr = Array(length).fill({});
  arr[0][`right`] = isRight;
  arr[0][`time`] = time;

  return arr;
};

export const render = (template) => {
  const wrapper = document.createElement(`div`);
  wrapper.innerHTML = template.trim();
  return wrapper;
};

export const changeScreen = (element) => {
  mainElement.innerHTML = ``;
  mainElement.appendChild(element);
};
