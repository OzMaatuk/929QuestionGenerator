"use strict";
/*
function validating data from 929 upress db
*/
module.exports = {
    validateChapterData: (data) => {
        if (data.length === 0 || !data || data === {} || !data.info)
        {
            throw new Error("ERROR_CHAPTER_DATA_VALIDATION");
        }
    },

    validateExtensionData: (data) => {
        if (data.length === 0 || !data || data === {} || !data.text || !data.title)
        {
            throw new Error("ERROR_EXTENSION_DATA_VALIDATION");
        }
    }
}