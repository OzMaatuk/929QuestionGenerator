"use strict";

const q1 = require("../generatorQuestions/q1.js");
const q2 = require("../generatorQuestions/q2.js");
const q3 = require("../generatorQuestions/q3.js");
const q4 = require("../generatorQuestions/q4.js");
const q5 = require("../generatorQuestions/q5.js");
const q6 = require("../generatorQuestions/q6.js");
const q7 = require("../generatorQuestions/q7.js");
const q8 = require("../generatorQuestions/q8.js");
const q9 = require("../generatorQuestions/q9.js");

module.exports = {
    generate_question: async (book, chapter, type) => {
        try {
            switch (type) {
                case 1:
                    return await q1.generate(book, chapter);
                case 2:
                    return await q2.generate(book, chapter);
                case 3:
                    return await q3.generate(book, chapter);
                case 4:
                    return await q4.generate(book, chapter);
                case 5:
                    return await q5.generate(book, chapter);
                case 6:
                    return await q6.generate(book, chapter);
                case 7:
                    return await q7.generate(book, chapter);
                case 8:
                    return await q8.generate(book, chapter);
                case 9:
                    return await q9.generate(book, chapter);
                default:
                    return "WRONG_QUESTION_TYPE";
              }
        } catch (error) {
            console.log("------------------\n" + error + "\n------------------");
            console.error("ERROR_GENERATING_QUESTION");
            return "ERROR_GENERATING_QUESTION";
        }
    }
}