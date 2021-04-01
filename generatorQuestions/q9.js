"use strict";

const q8 = require("./q8.js");

function replaceNoBody(answers)
{
    let noBodyIndex = answers.indexOf("אף-אחד");
    if (noBodyIndex >= -1)
    {
        answers[noBodyIndex] = "כולם";
    }
    return answers;
}

module.exports = {
    generate: async (book, chapter) => {
        //question type: which places are NOT included in this chapter
        let result = await q8.generate(book, chapter);
        result.answers = replaceNoBody(result.answers);
        return {
            "debug": {
                "correctAnswersArray": result.debug.wrongAnswersArray,
                "wrongAnswersArray": result.debug.correctAnswersArray
            },
            "book": result.book,
            "chapter": result.chapter,
            "questionType": 9,
            "question": "אילו מהמקומות הבאים אינם מופיעים בפרק זה?",
            "answers": result.answers,
            "correctAnswersArray": result.wrongAnswersArray,
            "wrongAnswersArray": result.correctAnswersArray
        }
    }
}