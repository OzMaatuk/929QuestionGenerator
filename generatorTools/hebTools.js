"use strict";
/*
tools functions dealing with hebrew sentence/charecters
*/

module.exports = {
    isConntectionWord: (word) => {
        return false;
    },

    getNoneAnswer: () => {
        return "אף-אחד";
    },

    normalizeHeb: (str) => {
        return str;
    }
}