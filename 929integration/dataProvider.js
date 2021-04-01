"use strict";
/*
function providing data from 929 upress db
*/
const fetch = require("node-fetch");
const extensionsProvider = require("./ChapterExtensionsProvider.js");
const URLProvider = require("./URLProvider.js");
const dataValidator = require("./dataValidator.js");

module.exports = {
    //return data object from chapter followed inputs
    getExtesionData: async (extensionType, attribute, book, chapter) =>
    {        
        const fetchData =  await fetch(URLProvider.get929URL("chapter", book, chapter))
            .then(response => response.json())
            .then(json =>  { dataValidator.validateChapterData(json); return json })
            .catch(function(err) {
                console.log(err);
                console.error("ERROR_FETCHING_CHAPTER");
                throw new Error("ERROR_FETCHING_CHAPTER");
            });
        try {
            return await extensionsProvider.getData(extensionType, attribute, fetchData);   
        } catch (err) {
            console.log("--------------------\n" + err + "\n----------------------");
            console.error("ERROR_FETCHING_CHAPTER_EXTENSION");
            return "NO_DATA";
        }
    },

    //return verse text from chapter object
    getVerse: async (book, chapter, verseNum) => {
        const fetchData =  await fetch(URLProvider.get929URL("chapter", book, chapter))
        .then(response => response.json())
        .then(json =>  { dataValidator.validateChapterData(json); return json })
        .catch(function(err) {
            console.log(err);
            console.error("ERROR_FETCHING_CHAPTER");
            throw new Error("ERROR_FETCHING_CHAPTER");
        });
        try {
            return fetchData['info']['verses_without_nikud'][verseNum]['verse'];    
        } catch (err) {
            console.log("--------------------\n" + err + "\n----------------------");
            console.error("ERROR_FETCHING_CHAPTER_VERSE");
            return "NO_DATA";
        }
    },

    //retrun translate object from proper verse
    getVerseAndTranslate: async (book, chapter, verseNum) => {
        const fetchData =  await fetch(URLProvider.get929URL("chapter", book, chapter))
        .then(response => response.json())
        .then(json =>  { dataValidator.validateChapterData(json); return json })
        .catch(function(err) {
            console.log(err);
            console.error("ERROR_FETCHING_CHAPTER");
            throw new Error("ERROR_FETCHING_CHAPTER");
        });
        try {
            return {
                "translate": fetchData['info']['translates'][String(verseNum)],
                "verse": fetchData['info']['verses_without_nikud'][verseNum]['verse']
            };
        } catch (err) {
            console.log("--------------------\n" + err + "\n----------------------");
            console.error("ERROR_FETCHING_CHAPTER_TRANSLATE");
            return "NO_DATA";
        }
    },

    // return paragraphs array from chapter object
    getParagraphs: async (book, chapter) => {
        const fetchData =  await fetch(URLProvider.get929URL("chapter", book, chapter))
        .then(response => response.json())
        .then(json =>  { dataValidator.validateChapterData(json); return json })
        .catch(function(err) {
            console.log(err);
            console.error("ERROR_FETCHING_CHAPTER");
            throw new Error("ERROR_FETCHING_CHAPTER");
        });
        try {
            return fetchData['info']['paragraphs'];
        } catch (err) {
            console.log("--------------------\n" + err + "\n----------------------");
            console.error("ERROR_FETCHING_CHAPTER_PARAGRAPHS");
            return "NO_DATA";
        }
    }
}
