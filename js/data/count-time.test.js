
import {assert} from 'chai';
import Counter from './count-time';


const secondsCounter = new Counter(50);

describe(`Count time`, () => {
  it(`Seconds should be a number`, () => {
    assert.isNumber(secondsCounter.seconds);
  });

  it(`Seconds should not be negative`, () => {
    assert.throws(() => new Counter(0), /Seconds should not be negative/);
  });
});
