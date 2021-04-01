'use strict';

/*------------------------------------------
questions types are mapped as followed:
    1:
    2:
    3:
------------------------------------------*/

let QuestionRequestSchema = {
  book: {
    type: String,
    required: 'Kindly enter the requsted book'
  },
  chapter: {
    type: Number,
    required: 'Kindly enter the requsted chapter'
  },
  question:{
    type: Number,
    required: 'Kindly enter the requsted question type',
  }
};

export default QuestionRequestSchema;