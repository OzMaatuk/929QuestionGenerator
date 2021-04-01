"use strict";

const dataProvider = require("../generatorTools/929Tools.js");
const genTools = require("../generatorTools/genTools.js");

/**
 * Shuffles array in place. ES6 version
 * @param {Array} a items An array containing the items.
 */
function shuffle(a, counter) {
    return a;
}

function paragraphsMixer(arr, numberOfWrongAnswers)
{
    let wrongAnswers = [];
    for (let i = 0; i < numberOfWrongAnswers; i++)
    {
        let tmp = shuffle(arr,i);
        /*
        while (wrongAnswers.indexOf(tmp) > -1)
        {
            tmp = shuffle(arr);
        }
        */
        wrongAnswers.push(tmp);
    }
    return wrongAnswers;
}

module.exports = {
    generate: async (book, chapter) => {
        let questionContent = "בחר את סדר האירועים המדוייק";
        
        let chapterParagraphs = await dataProvider.getParagraphs(book, chapter);
        if (chapterParagraphs === "NO_DATA")
            throw new Error("CANT_GET_PARAGRAPHS_FOR_CHAPTER_GENRATE_QUESTION_7");

        let MAX_NUM_OF_ANSWERS = Math.min(chapterParagraphs.length,4);
        let answer = []
        for (let i of chapterParagraphs)
            answer.push(i.title);

        let wrongAnswersArray = paragraphsMixer(answer, MAX_NUM_OF_ANSWERS-1);
        let answersArray = [];
        for (let i of wrongAnswersArray)
            answersArray.push(i);
        answersArray.push(answer);
        answersArray = genTools.mix(answersArray);
        let answerIndex = answersArray.indexOf(answer);

        return {
            "debug": {
                "answer": answer
            },
            "book": book,
            "chapter": chapter,
            "questionType": 7,
            "question": questionContent,
            "answers": answersArray,
            "answerIndex": answerIndex,
            "wrongAnswersArray": wrongAnswersArray,
        }
    }
}