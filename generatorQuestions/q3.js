"use strict";

const genTools = require("../generatorTools/genTools.js");
const dataProvider = require("../generatorTools/929Tools.js");

module.exports = {
    generate: async (book, chapter) => {
        let questionContent = "השלם את המילים החסרות בפסוק: ";

        //implement a logic which set a verse number with a specifit word / phrase
        let verseNumber = genTools.getRandomInt(10);
        
        let choosenVerse = await dataProvider.getVerse(book, chapter, verseNumber, "verse");
        if (choosenVerse === "NO_DATA")
            throw new Error("CANT_CANT_VERSE_GENERATE_QUESTION_3");
        let sentence = genTools.removeHTML(choosenVerse);
        let data = genTools.generateMissingSentence(sentence);
        
        return {
            "debug": {
                "originalSentence": data.originalSentence,
                "answersIndexArray": data.answersIndexArray,
            },
            "book": book,
            "chapter": chapter,
            "questionType": 3,
            "question": questionContent + data.sentence,
            "answers": data.answersArray,
            "correctAnswersArray": data.correctAnswersArray,
        }
    }
}