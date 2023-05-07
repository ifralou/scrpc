const normalizePrice = require('./utils');

const test1 = "55 990,-\n";
const solution1 = 55990;

test(`Normilized price ${test1} must by ${solution1}`, () => {
    expect(normalizePrice(test1)).toBe(solution1);
});