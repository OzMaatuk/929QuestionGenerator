"use strict";
/*
this lib relat on chapter object struncture from 929 upress db
functions from getting proper extensions data from chapter
*/
const fetch = require("node-fetch");
const URLProvider = require("./URLProvider.js");
const dataValidator = require("./dataValidator.js");

async function getData(type, attribute, chapterData)
{
    let extensionArray;
    if (chapterData["info"][type])
        extensionArray = chapterData["info"][type];
    else
        throw new Error("NO_SUCH_EXTENSION_TYPE_IN_CHAPTER");

    let returnedArray = [];
    for (let i of extensionArray)
    {
        let post_id = i["post_id"];
        let description_id = i["description_id"];
        let httpgeturl = URLProvider.get929URL(type, post_id, description_id);

        const fetchData = await fetch(httpgeturl)
        .then(response => response.json()).then(function(json) {
            dataValidator.validateExtensionData(json); return json;
        }).catch(function(err) {
            console.log("--------------------\n" + err + "\n----------------------");
            console.error("ERROR_FETCHING_EXTENSION");
            continue;
        });
        returnedArray.push(fetchData);
    }
    
    switch(attribute)
    {
        case "title": return getTitles(returnedArray);
        case "text": return getText(returnedArray);
        case "all": return returnedArray;
        default: throw new Error("NO_SUCH_EXTENSION_ATTRIBUTE");
    }
}

function getTitles(data)
{
    let returnedArray = [];
    for (let i of data)
    {
        returnedArray.push(i["title"]);
    }
    return returnedArray;
}

function getText(data)
{
    let returnedArray = [];
    for (let i of data)
    {
        returnedArray.push(i["text"]);
    }
    return returnedArray;
}

module.exports = {
    getData: async (extensionType, attribute, chapterData) =>
    {
        switch(extensionType)
        {
            case "persons": return await getData("persons", attribute, chapterData);
            case "words": return await getData("words", attribute, chapterData);
            case "places": return await getData("places", attribute, chapterData);
            case "phrases": return await getData("phrases", attribute, chapterData);
            default: throw new Error("WRONG_EXTENSION_TYPE");
        }
    }
}