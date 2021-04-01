'use strict';

const routes = require('express').Router();
const qGenController = require('../controllers/qGenControllers.js');

/**
 * @swagger
 * tags:
 *   - name: generator
 *     description: question generator
 */

/**
 * @swagger
 * definitions:
 *   Menu:
 *     type: object
 *     properties:
 *      1: 
 *        type: string
 *      2: 
 *        type: string
 *      3: 
 *        type: string
 *      4: 
 *        type: string
 *      5: 
 *        type: string
 *      6: 
 *        type: string
 *      7: 
 *        type: string
 *      8:
 *        type: string
 *      9:
 *        type: string
 *   Question:
 *     type: object
 *     properties:
 *      book: 
 *        type: string
 *      chapter: 
 *        type: integer
 *      questionType:
 *        type: integer
 *      question: 
 *        type: string
 *      answers: 
 *        type: array
 *        items:
 *          type: string
 *      correctAnswers: 
 *        type: array
 *        items:
 *          type: string
 *      WrongAnswers: 
 *        type: array
 *        items:
 *          type: string
 *   Quiz:
 *     type: array
 *     items:
 *        type: object
 *        properties:
 *          question: 
 *            type: string
 *          answers: 
 *            type: array
 *            items:
 *              type: string
 *          correctAnswers: 
 *            type: array
 *            items:
 *              type: string
 *          WrongAnswers: 
 *            type: array
 *            items:
 *              type: string
 *   Error:
 *     type: object
 *     properties:
 *        message:
 *           type: string
 */

/**
 * @swagger
 * /:
 *   get:
 *     tags:
 *       - menu
 *     summary: get menu of question types
 *     operationId: get all questions types
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *     responses:
 *       200:
 *         description: OK
 *         schema:
 *           $ref: "#/definitions/Menu"
 *       404:
 *          description: book / chapter / question-type not found
 *          schema:
 *             $ref: '#/definitions/Error'
 */
routes.get('/', (req, res) => {
  res.status(200).json({ message: 'Connected!', questionsTypes: qGenController.get_questions_types() });
});

/**
 * @swagger
 * /getQuestion/:
 *   get:
 *     tags:
 *       - question generator
 *     summary: get question for specific type, book and chapter
 *     operationId: generate question
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: query
 *         name: bookName
 *         description: name of book in english
 *         required: true
 *         schema:
 *           type: string
  *       - in: query
 *         name: chapterNumber
 *         description: number of chapter in book
 *         required: true
 *         schema:
 *           type: integer
  *       - in: query
 *         name: questionType
 *         description: type number of question
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: OK
 *         schema:
 *           $ref: "#/definitions/Question"
 *       404:
 *          description: Course not found
 *          schema:
 *             $ref: '#/definitions/Error'
 */
routes.get('/getQuestion', async (req, res) => {
  let book = req.query.bookName;
  let chapter = Number(req.query.chapterNumber);
  let type = Number(req.query.questionType);
  let result = await qGenController.get_question(book, chapter, type);
  res.status(200).send(result);
});

/**
 * @swagger
 * /getQuiz/:
 *   get:
 *     tags:
 *       - quiz generator
 *     summary: build quiz relay on question generator by book and chapter
 *     operationId: generate quiz
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: query
 *         name: bookName
 *         description: name of book in english
 *         required: true
 *         schema:
 *           type: string
  *       - in: query
 *         name: chapterNumber
 *         description: number of chapter in book
 *         required: true
 *         schema:
 *           type: integer
  *       - in: query
 *         name: number
 *         description: number of questions
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: OK
 *         schema:
 *           $ref: "#/definitions/Quiz"
 *       404:
 *          description: Course not found
 *          schema:
 *             $ref: '#/definitions/Error'
 */
routes.get('/getQuiz', async (req, res) => {
  let book = req.query.bookName;
  let chapter = Number(req.query.chapterNumber);
  let number = Number(req.query.number);
  let result = await qGenController.get_quiz(book, chapter, number);
  res.status(200).send(result);
});

module.exports = routes;