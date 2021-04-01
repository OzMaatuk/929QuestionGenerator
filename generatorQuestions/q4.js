"use strict";

const genTools = require("../generatorTools/genTools.js");
const dataProvider = require("../generatorTools/929Tools.js");

module.exports = {
    generate: async (book, chapter) => {
        //question type: which charecters are included in this chapter
        let MAX_NUM_OF_ANSWERS = 4;
        let questionContent = "איזו מילה משלימה את התיאור הבא? : ";
        
        //setting array of correct answers
        let correctAnswersArray = await dataProvider.getWordsExtension(book, chapter);
        if (!correctAnswersArray || correctAnswersArray == "NO_DATA")
            throw new Error("CANT_GET_WORD_GENERATE_QUESTION_4");

        let chosenAnswerIndex = genTools.getRandomInt(correctAnswersArray.length);
        let chosenAnswer = correctAnswersArray[chosenAnswerIndex];

        if (!chosenAnswer.title || !chosenAnswer.text)
            throw new Error("GOT_BROKEN_WORD_EXTENSION_GENERATE_QUESTION_4");

        //setting array of wrong answers
        let wrongAnswersArray = await dataProvider.getWordsTitlesFromOtherChapters(book, chapter, [chosenAnswer.title], 1, MAX_NUM_OF_ANSWERS);
        if (wrongAnswersArray == [])
            throw new Error("CANT_GET_WRONG_ANSWERS_GENERATE_QUESTION_4");

        let answersArray = genTools.generateAnswers([chosenAnswer.title], wrongAnswersArray, 1, MAX_NUM_OF_ANSWERS);
    
        wrongAnswersArray = genTools.diff(wrongAnswersArray, answersArray);
        let wrongAnswersIndexArray = genTools.getIndexArrayFromAnswer(wrongAnswersArray, answersArray);

        chosenAnswer.text = genTools.removeHTML(chosenAnswer.text)
        let sentence = chosenAnswer.text;
        let choosenWordRegex = new RegExp(chosenAnswer.title, "g");
        sentence = sentence.replace(choosenWordRegex, "_____");
        questionContent = questionContent + " " + sentence;
    
        return {
            "debug": {
                "text": chosenAnswer.text,
                "originalSentence": chosenAnswer.title,
                "wrongAnswersArray": wrongAnswersArray
            },
            "book": book,
            "chapter": chapter,
            "questionType": 4,
            "question": questionContent,
            "answers": answersArray,
            "correctAnswer": chosenAnswer.title,
            "wrongAnswersArray": wrongAnswersIndexArray,
            "wrongAnswersIndexArray": wrongAnswersIndexArray
        }
    }
}