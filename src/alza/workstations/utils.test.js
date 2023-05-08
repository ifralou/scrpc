const normalizePrice = require('./utils');

test(`Price normalization test.`, () => {
    const data = [
        {test: "55 990,-\n", solution: 55990},
        {test: "113 840,-", solution: 113840}
    ];

    for (let {test, solution} of data) {
        expect(normalizePrice(test)).toBe(solution);
    }
});
