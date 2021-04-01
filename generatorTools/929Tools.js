"use strict";
/*
generator tool structing proper data for building questions.
necessary functions optimizing data from a data provider,
which in this case is an 929integration.
*/
const dataProvider = require("../929integration/dataProvider.js");
const hebTools = require("./hebTools.js");

function normalizeHeb(str)
{
    //this function should convert any hebrew string to hebrew string without nukid or teamim
    return hebTools.normalizeHeb(str);
}

function unique(arr) {
    let a = arr.concat();
    for (let i = 0; i < a.length; ++i) {
        let regex = new RegExp(a[i], "g");
        for (let j = i + 1; j < a.length; ++j) {
            if (a[i] === a[j] || a[j].match(regex))
                a.splice(j--, 1);
        }
    }
    return a;
};

function randomChoice()
{
    return Math.random() >= 0.5;
}

//return text sentence followed input
async function getSenteceByType(book, chapter, number, type) {
    let response = "NO_DATA";
    try {
        switch (type)
        {
            case "verse": response = await dataProvider.getVerse(book, chapter, number); break;
            case "translate": response = await dataProvider.getVerseAndTranslate(book, chapter, number); break;
            default: throw new Error("NO_SUCH_SENTENCE_TYPE");
        }
    } catch (error) {
        console.log(error)
        console.error("ERROR_GET_SENTENCE");
    }
    return response;
}

// return array of wrong answers from other capters
async function getWrongAnswers(book, chapter, type, attribute, correctAnswersArray, numberOfWantedCorrectAnswers, MAX_NUM_OF_ANSWERS) {
    let numberOfWrongAnswers = MAX_NUM_OF_ANSWERS - numberOfWantedCorrectAnswers;
    if (numberOfWrongAnswers === 0) return [];

    let prevWrongAnswers = [];
    let nextWrongAnswers = [];

    //collect 3 wrong answers cuz its the maximum we will need
    //collect backwords
    for (let i = chapter - 1; i > 0; i--) {
        if (randomChoice())
        {
            let answersFromOtherChapter = await collectAnswersFromOtherChapters(book, i, type, attribute, correctAnswersArray);
            if (answersFromOtherChapter == "NO_DATA")
                continue;

            prevWrongAnswers = unique(prevWrongAnswers.concat(answersFromOtherChapter));
            if (prevWrongAnswers.length >= numberOfWrongAnswers) {
                return prevWrongAnswers;
            }
        }
        
    }

    //if not enough
    //collect forward
    let i = chapter++;
    let lim = numberOfWrongAnswers - prevWrongAnswers.length;
    while (lim > 0) {
        if (randomChoice())
        {
            let answersFromOtherChapter = await collectAnswersFromOtherChapters(book, i, type, attribute, correctAnswersArray);
            if (answersFromOtherChapter == "NO_DATA")
            {
                i++;
                continue;
            }

            nextWrongAnswers = unique(nextWrongAnswers.concat(answersFromOtherChapter));
            lim = MAX_NUM_OF_ANSWERS - prevWrongAnswers.length - nextWrongAnswers.length;
            i++;
        }
    }

    return unique(prevWrongAnswers.concat(nextWrongAnswers));
}

//return proper answer details by type and attribute
async function collectAnswersFromOtherChapters(book, chapter, type, attribute, correctAnswersArray) {
    //need diff strategy for collecting wrong answer for more complex quiz.
    let response = await getExtesionByType(type, attribute, book, chapter);
    if (response == "NO_DATA") return "NO_DATA";
    //remove correct answers
    for (let j of correctAnswersArray) {
        let index = response.indexOf(j);
        if (index > -1) {
            response.splice(index, 1);
        }
    }
    return response;
}

// return data object followed the input
async function getExtesionByType(type, attribute, book, chapter) {
    let response = "NO_DATA";
    try {
        response = await dataProvider.getExtesionData(type, attribute, book, chapter);
    } catch (error) {
        console.log(error)
        console.error("ERROR_GET_EXTENSION_DATA");
    }
    return response;
}

// return an paragraphs array of the chapter (could be a witch cane in getExtesionByType)
async function getParagraphs(book, chapter) {
    let response = "NO_DATA";
    try {
        response = await dataProvider.getParagraphs(book, chapter);
    } catch (error) {
        console.log(error)
        console.error("ERROR_GET_EXTENSION_DATA");
    }
    return response;
}

module.exports = {
    getPersonsTitlesFromOtherChapters: async (book, chapter, correctAnswersArray, numberOfWantedCorrectAnswers, MAX_NUM_OF_ANSWERS) => {
        return await getWrongAnswers(book, chapter, "persons", "title", correctAnswersArray, numberOfWantedCorrectAnswers, MAX_NUM_OF_ANSWERS);
    },

    getPlacesTitlesFromOtherChapters: async (book, chapter, correctAnswersArray, numberOfWantedCorrectAnswers, MAX_NUM_OF_ANSWERS) => {
        return await getWrongAnswers(book, chapter, "places", "title", correctAnswersArray, numberOfWantedCorrectAnswers, MAX_NUM_OF_ANSWERS);
    },

    getWordsTitlesFromOtherChapters: async (book, chapter, correctAnswersArray, numberOfWantedCorrectAnswers, MAX_NUM_OF_ANSWERS) => {
        return await getWrongAnswers(book, chapter, "words", "title", correctAnswersArray, numberOfWantedCorrectAnswers, MAX_NUM_OF_ANSWERS);
    },

    getPersonsTitles: async (book, chapter) => {
        return await getExtesionByType("persons", "title", book, chapter);
    },

    getPlacesTitles: async (book, chapter) => {
        return await getExtesionByType("places", "title", book, chapter);
    },

    getVerse: async (book, chapter, number) => {
        return await getSenteceByType(book, chapter, number, "verse");
    },

    getVerseAndTranslate: async (book, chapter, number) => {
        return await getSenteceByType(book, chapter, number, "translate");
    },

    getWordsText: async (book, chapter) => {
        return await getExtesionByType("words", "text", book, chapter);
    },

    getPhrasesText: async (book, chapter) => {
        return await getExtesionByType("phrases", "text", book, chapter);
    },

    getWordsExtension: async (book, chapter) => {
        return  await getExtesionByType("words", "all", book, chapter);
    },

    getPhrasesExtension: async (book, chapter) => {
        return  await getExtesionByType("phrases", "all", book, chapter);
    },

    getParagraphs: async (book, chapter) => {
        return await getParagraphs(book, chapter);
    }
}