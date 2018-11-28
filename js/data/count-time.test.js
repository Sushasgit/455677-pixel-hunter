
import {assert} from 'chai';

// import Counter from './count-time.js';

import {ANSWER_TIME} from '../constants.js';

describe(`Count time`, () => {
  it(`Seconds should be a number`, () => {
    assert.isNumber(ANSWER_TIME);
  });
});

