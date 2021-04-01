"use strict";

const dataProvider = require("../generatorTools/929Tools.js");
const genTools = require("../generatorTools/genTools.js");

module.exports = {
    generate: async (book, chapter) => {
        //complate the defenition sentence
        let questionContent = "השלם את המילים החסרות בהסבר הביטוי ";

        let phrasesArray = await dataProvider.getPhrasesExtension(book, chapter);
        if (phrasesArray == "NO_DATA")
        throw new Error("CANT_GET_PHRASES_EXTENSION_GENERATE_QUESTION_6"); 
        if (!phrasesArray || phrasesArray == [])
            throw new Error("NO_PHRASES_FOR_CHAPTER");
        
        let chosenAnswerIndex = genTools.getRandomInt(phrasesArray.length-1);
        let wordText = genTools.removeHTML(phrasesArray[chosenAnswerIndex].text);
        let wordTitle = genTools.removeHTML(phrasesArray[chosenAnswerIndex].title);
        questionContent = questionContent + wordTitle + ": ";
        let data = genTools.generateMissingSentence(wordText);
        
        return {
            "debug": {
                "originalSentence": data.originalSentence,
                "answersIndexArray": data.answersIndexArray,
            },
            "book": book,
            "chapter": chapter,
            "questionType": 6,
            "question": questionContent + data.sentence,
            "answers": data.answersArray,
            "correctAnswersArray": data.correctAnswersArray,
        }
    }
}