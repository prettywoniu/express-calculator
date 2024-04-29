const {getMean, getMedian, getMode} = require('./helpers');

describe('#getMean', () => {
    test("finds the mean of an empty array", () => { 
        expect(getMean([])).toBeNaN();
      })
      it("finds the mean of an array of numbers", function () { 
        expect(getMean([1,-1,4,2])).toEqual(1.5)
      })
})

describe('#getMedian', () => {
    test('finds median for an even set', () => {
        expect(getMedian([1,4,3,7])).toEqual(3.5);
    })
    test('finds median for an odd set', () => {
        expect(getMedian([1,4,3,7,8])).toEqual(4);
    })
})

describe('#getMode', () => {
    test('Arrays equal', () => {
        expect(getMode[1,2,3]).toBeUndefined();
    })
    test('finds the mode', () => {
        expect(getMode([1,1,2,,7,7])).toEqual([1,7]);
    })
})