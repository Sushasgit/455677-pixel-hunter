// import {assert} from 'chai';

// import {countPoints} from './count-points.js';
// import {Answer} from '../constants.js';

// export const generateArray = (length, time, isRight) => {
//   const arr = Array(length).fill({});
//   arr[0][`right`] = isRight;
//   arr[0][`time`] = time;

//   return arr;
// };

// describe(`Check level changer`, () => {
//   it(`Return game points`, () => {
//     assert.equal(countPoints(generateArray(10, Answer.SLOW.title, true), 2), {600});
//     assert.equal(countPoints(generateArray(10, Answer.SLOW.title, true), 1), 550);
//     assert.equal(countPoints(generateArray(10, Answer.SLOW.title, true), 3), 650);
//     assert.equal(countPoints(generateArray(10, Answer.FAST.title, true), 3), 1650);
//     assert.equal(countPoints(generateArray(10, Answer.FAST.title, true), 2), 1600);
//     assert.equal(countPoints(generateArray(10, Answer.FAST.title, true), 1), 1550);
//     assert.equal(countPoints(generateArray(6, Answer.NORMAL.title, false), 3), -1);
//     assert.equal(countPoints(generateArray(10, Answer.NORMAL.title, true), 3), 1150);
//     assert.equal(countPoints(generateArray(10, Answer.NORMAL.title, true), 0), 1000);
//     assert.equal(countPoints(generateArray(10, Answer.NORMAL.title, true), 2), 1100);
//     assert.equal(countPoints(generateArray(10, Answer.NORMAL.title, true), 1), 1050);
//   });
// });
