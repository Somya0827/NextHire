const express = require('express')
const authMiddleware = require('../middleware/auth.middleware')
const interviewController = require('../controllers/interview.controller')
const upload = require("../middleware/file.middleware")

const interviewRouter = express.Router()

/**
 * @route POST /api/interview
 * @description generate new interview report on the basics of user self description , resume and job description 
 * @access private
 */

interviewRouter.post("/",authMiddleware.authUser,upload.single("resume"),interviewController.generateInterViewReportController)

/**
 * @route GET /api/interview/report/:interviewId
 * @description get interview report by interviewId
 * @access private
 */

interviewRouter.get("/report/:interviewId",authMiddleware.authUser,interviewController.generateInterviewReportByIdController)

/**
 * @route GET /api/interview/
 * @description get all interview report of logged in user
 */

interviewRouter.get("/",authMiddleware.authUser,interviewController.getAllInterviewReport)

module.exports = interviewRouter