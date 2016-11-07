'use strict';

angular.module('hemma.cycleText', [])
    .directive('cycleText', ['$timeout', '$window', 'cycleText.shuffleArray', function ($timeout, $window, shuffleArray) {
        return {
            bindToController: true,
            controllerAs: 'cycleCtrl',
            controller: ['$element', function (elem) {
                var cycleCtrl = this,
                    textSpot,
                    wordList,
                    randomOrder,
                    s,
                    timeoutLength,
                    curWordState,
                    loopTheWordsTimeout,
                    loopTheLettersTimeout;

                timeoutLength = 6000;
                wordList = [
                    'We are SuperUsers',
                    'We do Revenue Cycle Management',
                    'We optimize eCW',
                    'We develop eCW SuperUsers',
                    'We customize patient statements',
                    'We do HIPAA compliance',
                    'We do PCMH'
                ];

                textSpot = angular.element(elem[0].querySelectorAll('.cycle-text-text'));

                function doShuffle() {
                    textSpot.text(wordList[0]);
                    randomOrder = shuffleArray(wordList);
                    loopTheWords(randomOrder.length - 1);
                }

                function loopTheWords(i) {

                    loopTheWordsTimeout = setTimeout(function () {
                        curWordState = '';
                        textSpot.text('');
                        putThisTextInThere(randomOrder[i]);
                        if (--i >= 0) {
                            loopTheWords(i);
                        }
                        else {
                            doShuffle();
                        }
                    }, timeoutLength);
                }

                function loopTheLetters(i, timeout, word) {
                    var theText = '';
                    loopTheLettersTimeout = setTimeout(function () {
                        curWordState = curWordState + word[i];
                        textSpot.text(curWordState);
                        if (--i >= 0) {
                            loopTheLetters(i, timeout, word);
                        }
                        else {
                            return;
                        }
                    }, timeout);
                }

                function putThisTextInThere(word) {
                    var letterTimeoutLength;
                    curWordState = '';
                    textSpot.text('');

                    letterTimeoutLength = 100;

                    loopTheLetters(word.length - 1, letterTimeoutLength, word.split("").reverse().join(""));
                }

                function resetCycle() {
                    clearTimeout(loopTheLettersTimeout);
                    clearTimeout(loopTheWordsTimeout);
                    textSpot.text(wordList[0]);
                    curWordState = '';
                }

                $window.onfocus = doShuffle;
                $window.onblur = resetCycle;

                doShuffle();

            }],
            templateUrl: './site/components/cycle-text/cycle-text.html'
        };
    }])
    .factory('cycleText.shuffleArray', [function () {
        return function (array) {
            var currentIndex = array.length, temporaryValue, randomIndex;

            // While there remain elements to shuffle...
            while (0 !== currentIndex) {

                // Pick a remaining element...
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex -= 1;

                // And swap it with the current element.
                temporaryValue = array[currentIndex];
                array[currentIndex] = array[randomIndex];
                array[randomIndex] = temporaryValue;
            }

            return array;
        };
    }]);