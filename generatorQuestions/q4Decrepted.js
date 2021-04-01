"use strict";

const genTools = require("../generatorTools/genTools.js");
const dataProvider = require("../generatorTools/929Tools.js");

module.exports = {
    generate: async (book, chapter) => {
        let questionContent = "השלם את המילים החסרות בפירוש: ";

        //implement a logic which set a verse number with a specifit word / phrase
        let verseNumber = genTools.getRandomInt(10);
        
        let verseAndTranslate = await dataProvider.getVerseAndTranslate(book, chapter, verseNumber);
        if (verseAndTranslate === "NO_DATA")
            throw new Error("CANT_GET_TRANSLATE_GENERATE_QUESTION_4");
        while (!verseAndTranslate.translate)
        {
            verseNumber = genTools.getRandomInt(10);
            verseAndTranslate = await dataProvider.getVerseAndTranslate(book, chapter, verseNumber);
            if (verseAndTranslate === "NO_DATA")
                throw new Error("CANT_GET_TRANSLATE_GENERATE_QUESTION_4");
        }

        let choosenVerse = verseAndTranslate.verse;
        let choosenTranslate = verseAndTranslate.translate;
        let verse = genTools.removeHTML(choosenVerse);
        let translate = genTools.removeHTML(choosenTranslate);
        questionContent = "עבור הפסוק: " + verse + "    .   "+ questionContent + translate;
        let data = genTools.generateMissingSentence(translate);
        
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