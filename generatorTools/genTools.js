"use strict";
/*
necessary functions for building questions
*/
const Random = require("random-js").Random;
const hebTools = require("./hebTools.js");

function diff(arr1, arr2) {
    var ret = [];
    for(var i in arr1) {
        if(arr2.indexOf(arr1[i]) > -1){
            ret.push(arr1[i]);
        }
    }
    return ret;
};

// removing html tags and other inwanted charecters
function removeHTML(arr) {
    let htmlTagRegex1 = /(<([^>]+)>)/g;
    let htmlTagRegex2 = new RegExp('<(div|/div|br|p|/p)[^>]>', "g");
    let htmlTagRegex3 = /<\/?[^>]+(>|$)/g;
    let htmlTagRegex4 = /&#8211/g;
    return arr.replace(htmlTagRegex3, "").replace(htmlTagRegex1, "").replace(htmlTagRegex2, "").replace(/&quot;/g,'').replace(htmlTagRegex4,'').replace(/ *\([^)]*\) */g, "");
}

// return if a word is a connection/linking word in hebrew
function properWordToRemoveForSentence(word)
{
    //this function should contain a list of hebrew linking/connection words
    //if (word.length > 1 && !hebTools.isConntectionWord(word))
    if (word.length > 1)
        return true;
    return false;
}

// return indexs array of the qords that appeare in both input arrays
function getIndexArrayFromAnswer(array, answersArray)
{
    let result = [];
    for (let i of array)
    {
        let index = answersArray.indexOf(i);
        if (index > -1)
            result.push(index);
    }
    return result;
}

// how many words can we romive from a sentence
function getProportion(length)
{
    return Math.ceil(length/4);
}

// adds a none answer for the answers array
function addNoneAnswerToArray(answersArray) {
    let length = answersArray.length;
    let index = getRandomInt(length-1);
    answersArray[index] = hebTools.getNoneAnswer();
    return answersArray;
}

function getRandomInt(max) {
    //return Math.floor(Math.random() * Math.floor(max));
    let random = new Random(); // uses the nativeMath engine
    return random.integer(0, max);
}

function mixing_strategy_0(array) {
    return array;
}

function mixing_strategy_1(array) {
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
  }

// return an array after shuffle/mix
function mix(answers) {
    let mixingStrategy = getRandomInt(1);
    switch (mixingStrategy) {
        case 0:
            return mixing_strategy_0(answers);
        case 1:
            return mixing_strategy_1(answers);
        default:
            console.log("WRONG_MIXING_STRATEGY"); console.error("WRONG_MIXING_STRATEGY");
            return answers;
    }
}

//creating answers array from two input arrays
function generateAnswers(correctAnswersArray, wrongAnswersArray, numberOfCorrectAnswers, MAX_NUM_OF_ANSWERS) {
    let answersArray = [];
    let startFromIndex = 0;
    let index = 0;

    // collectiong correct answare 
    startFromIndex = getRandomInt(correctAnswersArray.length);
    for (let i = 0; i < numberOfCorrectAnswers; i++) {
        index = (startFromIndex + i) % correctAnswersArray.length;
        answersArray.push(correctAnswersArray[index]);
    }

    //collection wrong answers
    startFromIndex = getRandomInt(wrongAnswersArray.length);
    for (let i = 0; i < (MAX_NUM_OF_ANSWERS - numberOfCorrectAnswers); i++) {
        index = (startFromIndex + i) % wrongAnswersArray.length;
        answersArray.push(wrongAnswersArray[index]);
    }

    return mix(answersArray);
}

// return a sentece with a missing words
function generateMissingSentence(originalSentence)
{
        let sentence = originalSentence;
        let sentenceArray = sentence.split(' ');
        let answersArray = [];
        let numberOfMissingWords = getProportion(sentenceArray.length);
        let answersIndexArray = [];
    
        for (let i = 0; i < numberOfMissingWords; i++) {
            let choosenWordIndex = getRandomInt(sentenceArray.length-1);
            let choosenWord = sentenceArray[choosenWordIndex];
    
            while (answersArray.indexOf(choosenWord) > -1 && properWordToRemoveForSentence(choosenWord) && !choosenWord)
            {
                choosenWordIndex = (choosenWordIndex + getRandomInt(sentenceArray.length-1)) % sentenceArray.length;
                choosenWord = sentenceArray[choosenWordIndex];
            }
            answersIndexArray.push([choosenWordIndex,choosenWord]);
            answersArray.push(choosenWord);
            sentenceArray.splice(choosenWordIndex,1);
            let choosenWordRegex = new RegExp(choosenWord, "");
            sentence = sentence.replace(choosenWordRegex, "_____");
        }
    
        answersIndexArray.sort(function(a, b){return a[0]-b[0]});
        let correctAnswersArray = [];
        for (let i of answersIndexArray)
        {
            correctAnswersArray.push(i[1]);
        }

        return {
            "originalSentence": originalSentence,
            "sentence": sentence,
            "correctAnswersArray": correctAnswersArray,
            "sentenceArray": sentenceArray,
            "answersArray": mix(answersArray),
            "answersIndexArray": answersIndexArray,
        }
}

module.exports = {
    diff: (arr1, arr2) => {
        return diff(arr1,arr2);
    },
    
    removeHTML: (arr) => {
        return removeHTML(arr);
    },

    mix: (data) => {
        return mix(data);
    },

    getIndexArrayFromAnswer: (array, answersArray) => {
        return getIndexArrayFromAnswer(array, answersArray)
    },
    
    addNoneAnswerToArray: (answersArray) => {
        return addNoneAnswerToArray(answersArray);
    },
    
    getRandomInt: (max) => {
        return getRandomInt(max);
    },
    
    generateAnswers: (correctAnswersArray, wrongAnswersArray, numberOfCorrectAnswers, MAX_NUM_OF_ANSWERS) => {
        return generateAnswers(correctAnswersArray, wrongAnswersArray, numberOfCorrectAnswers, MAX_NUM_OF_ANSWERS);
    },

    generateMissingSentence: (originalSentence) => {
        return generateMissingSentence(originalSentence);
    }
}