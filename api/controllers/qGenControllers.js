"use strict";
const quizBuilder = require("../../generatorQuiz/quizBuilder.js");
const questionGenerator = require("../../generatorQuiz/questionGenerator.js");

exports.get_questions_types = ()  => {
  return {
    1: "אילו המדמויות הבאות מוזכרות בפרק?",
    2: "אילו מהדמויות הבאות אינן מופיעות בפרק זה?",
    3: "השלם את המילים החסרות בפסוק",
    4: "איזו מילה משלימה את התיאור הבא", //ניתן להעתיק ולעשות עבור אנשים,מקומות,וביטויים
    5: "השלם את המילים החסרות בהסבר המילה",
    6: "השלם את המילים החסרות בהסבר הביטוי",
    7: "בחר את סדר האירועים המדוייק",
    8: "אלו מהמקומות הבאים מוזכר בפרק?",
    9: "אלו מהמקומות הבאים אינם מוזכרים בפרק?"
  }
};

exports.get_question = async (book, chapter, type)  => {
    return await questionGenerator.generate_question(book, chapter, type);
};

exports.get_quiz = async (book, chapter, number)  => {
    return await quizBuilder.get_quiz(book, chapter, number);
  };