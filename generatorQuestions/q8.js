"use strict";

const genTools = require("../generatorTools/genTools.js");
const dataProvider = require("../generatorTools/929Tools.js");

module.exports = {
    generate: async (book, chapter) => {
        //question type: which charecters are included in this chapter
        let MAX_NUM_OF_ANSWERS = 4;
        let questionContent = "?אילו מהמקומות הבאים מופיעים בפרק זה";
        
        //setting array of correct answers
        let correctAnswersArray = await dataProvider.getPlacesTitles(book, chapter);
        if (phrasesArray == "NO_DATA")
            throw new Error("CANT_GET_PLACES_EXTENSION_GENERATE_QUESTION_8"); 
        if (!correctAnswersArray)
            correctAnswersArray = [];
        let numberOfWantedCorrectAnswers = Math.min(genTools.getRandomInt(correctAnswersArray.length), MAX_NUM_OF_ANSWERS);

        //setting array of wrong answers
        let wrongAnswersArray = await dataProvider.getPlacesTitlesFromOtherChapters(book, chapter, correctAnswersArray, numberOfWantedCorrectAnswers, MAX_NUM_OF_ANSWERS);
        if (wrongAnswersArray == [])
            throw new Error("CANT_GET_WRONG_ANSWERS_GENERATE_QUESTION_8");

        let answersArray = genTools.generateAnswers(correctAnswersArray, wrongAnswersArray, numberOfWantedCorrectAnswers, MAX_NUM_OF_ANSWERS);
    
        //handling option of none answer
        if (numberOfWantedCorrectAnswers === 0)
        {
            answersArray = genTools.addNoneAnswerToArray(answersArray);
            correctAnswersArray.push("אף-אחד");
        }
        else
        {
            if (genTools.getRandomInt(1))
            {
                answersArray = genTools.addNoneAnswerToArray(answersArray);
                wrongAnswersArray.push("אף-אחד");
            }
        }
    
        correctAnswersArray = genTools.diff(correctAnswersArray, answersArray);
        wrongAnswersArray = genTools.diff(wrongAnswersArray, answersArray);
        let correctAnswersIndexArray = genTools.getIndexArrayFromAnswer(correctAnswersArray, answersArray);
        let wrongAnswersIndexArray = genTools.getIndexArrayFromAnswer(wrongAnswersArray, answersArray);
    
        return {
            "debug": {
                "correctAnswersArray": correctAnswersArray,
                "wrongAnswersArray": wrongAnswersArray
            },
            "book": book,
            "chapter": chapter,
            "questionType": 8,
            "question": questionContent,
            "answers": answersArray,
            "correctAnswersArray": correctAnswersIndexArray,
            "wrongAnswersArray": wrongAnswersIndexArray
        }
    }
}