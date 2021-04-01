"use strict";

const q1 = require("./q1.js");

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
        //question type: which charecters are NOT included in this chapter
        let result = await q1.generate(book, chapter);
        result.answers = replaceNoBody(result.answers);
        return {
            "debug": {
                "correctAnswersArray": result.debug.wrongAnswersArray,
                "wrongAnswersArray": result.debug.correctAnswersArray
            },
            "book": result.book,
            "chapter": result.chapter,
            "questionType": 2,
            "question": "אילו מהדמויות הבאות אינן מופיעות בפרק זה?",
            "answers": result.answers,
            "correctAnswersArray": result.wrongAnswersArray,
            "wrongAnswersArray": result.correctAnswersArray
        }
    }
}