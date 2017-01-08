'use strict';
beforeEach(module('app'));

describe('components', function () {
  var wordList,
      shuffleArray,
      shuffledWordList,
      staticWordList;

  beforeEach(inject(function ($injector) {
    wordList = $injector.get('cycleText.wordList');
    shuffleArray = $injector.get('cycleText.shuffleArray');
  }));

  staticWordList = [
    'We are SuperUsers',
    'We do Revenue Cycle Management',
    'We optimize eCW',
    'We develop eCW SuperUsers',
    'We customize patient statements',
    'We do HIPAA compliance',
    'We do PCMH'
  ];

  it('should have cycleText.wordList', function () {
    expect(wordList).toEqual(staticWordList);
    expect(Array.isArray(wordList)).toBe(true);
  });

  it('should reorder cycleText.wordList', function () {
    shuffledWordList = shuffleArray(wordList);
    expect(wordList.length).toBe(shuffledWordList.length);
  });
});
