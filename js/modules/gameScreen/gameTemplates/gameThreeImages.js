import {render} from '../../../utils';

export const gameThreeImages = (data) => {
  console.log('GAME3', data)
  const template = ` <section class="game">
  <p class="game__task">Найдите рисунок среди изображений</p>
  <form class="game__content  game__content--triple">
    <div data-id="1" data-type="paint" class="game__option game__threeImage">
      <img src=${data.answers[0].image.url}  alt="Option 1" width="304" height="455">
    </div>
    <div data-id="2" data-type="photo" class="game__option game__threeImage game__option--selected">
      <img src=${data.answers[1].image.url}  alt="Option 2" width="304" height="455">
    </div>
    <div data-id="3" data-type="photo" class="game__option game__threeImage">
      <img src=${data.answers[2].image.url} alt="Option 3" width="304" height="455">
    </div>
  </form>
</section>`;
  const element = render(template);
  return element;
};

export default gameThreeImages;
