const sum = require('./sum');

const jest = require('jest');

test('for adding two numbers', () => {
    expect(sum(2,3)).toBe(5);
})

