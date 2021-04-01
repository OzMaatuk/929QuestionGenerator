"use strict";

const questionGenerator = require("./questionGenerator.js");
const genTools = require("../generatorTools/genTools.js");

function isQuestion(data)
{
    if (data.question && data.answers)
        return true;
    return false;
}

function checkInput(book, chapter, number)
{
    return true;
}

module.exports = {
    get_quiz: async (book, chapter, number) => {
        if (!checkInput(book, chapter, number)) return "WRONG_PARAMETERS";
        let quiestionsCounter = 0;
        let questionsArray = [];
        let TYPES_OF_QUESTIONS = 8;
        while (quiestionsCounter < number)
        {
            let currentQuestionType = genTools.getRandomInt(TYPES_OF_QUESTIONS)+1;
            console.log("---------------------");
            console.log(currentQuestionType);
            console.log("---------------------");
            let questionObject = await questionGenerator.generate_question(book, chapter, Number(currentQuestionType));
            if (!isQuestion(questionObject)) continue;
            questionsArray.push(questionObject);
            quiestionsCounter++;
        }
        return questionsArray;
    }
}