"use strict";

const genTools = require("../generatorTools/genTools");
const dataProvider = require("../generatorTools/929Tools.js");

module.exports = {
    generate: async (book, chapter) => {
        //complate the defenition sentence
        let questionContent = "השלם את המילים החסרות בהסבר המילה ";

        let wordsArray = await dataProvider.getWordsExtension(book, chapter);
        if (wordsArray == "NO_DATA")
            throw new Error("CANT_GET_WORDS_EXTENSION_GENERATE_QUESTION_5"); 
        if (!wordsArray || wordsArray == [])
            throw new Error("NO_WORDS_FOR_CHAPTER");
        
        let chosenAnswerIndex = genTools.getRandomInt(wordsArray.length-1);
        let wordText = genTools.removeHTML(wordsArray[chosenAnswerIndex].text);
        let wordTitle = genTools.removeHTML(wordsArray[chosenAnswerIndex].title);
        questionContent = questionContent + wordTitle + ": ";
        let data = genTools.generateMissingSentence(wordText);
        
        return {
            "debug": {
                "originalSentence": data.originalSentence,
                "answersIndexArray": data.answersIndexArray,
            },
            "book": book,
            "chapter": chapter,
            "questionType": 5,
            "question": questionContent + data.sentence,
            "answers": data.answersArray,
            "correctAnswersArray": data.correctAnswersArray,
        }
    }
}