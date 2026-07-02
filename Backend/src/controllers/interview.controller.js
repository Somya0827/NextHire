const pdfParse = require("pdf-parse")
const generateInterviewReport = require("../services/ai.service")
const interviewReportModel = require("../models/interviewReport.model")

/**
 * @description controller to generate interview report based on user self description, resume and job description  
 */

async function generateInterViewReportController(req, res) {

    // console.log("req.file:", req.file);
    // console.log("req.body meow mewo:", req.body);
    // console.log("headers :", req.headers["content-type"]);

    if (!req.file) {
        return res.status(400).json({
            message: "File not received"
        });
    }

    const resumeContent = (new pdfParse.PDFParse(Uint8Array.from(req.file.buffer))).getText();
    const { selfDescription, jobDescription } = req.body;

    const interviewReportByAi = await generateInterviewReport({
        resume: resumeContent.text,
        selfDescription,
        jobDescription
    })

    const interviewReport = await interviewReportModel.create({
        user: req.user._id,
        resume: resumeContent.text,
        selfDescription,
        jobDescription,
        ...interviewReportByAi
    })

    return res.status(201).json({
        message: "Interview report generated successfully",
        interviewReport
    })
}

/**
 * @description controller to generate interview report by interviewId  
 */

async function generateInterviewReportByIdController(req,res){
    const {interviewId} = req.params
    const interviewReport = await interviewReportModel.findOne({_id:interviewId,user:req.user._id})

    if(!interviewReport){
        return res.status(404).json({
            message:"Interview report not found"
        })
    }

    return res.status(200).json({
        message : "Interview report fetched successfully",
        interviewReport
    })
}

/**
 * @description controller to generate all interview report of logged in user  
 */

async function getAllInterviewReport (req,res){
    const interviewReports = await interviewReportModel
        .find({ user: req.user._id })
        .sort({ createdAt: -1 })
        .select("-resume -selfDescription -jobDescription -__v -technicalQuestions -behavioralQuestions -skillGaps -preparationPlan");

    return res.status(200).json({
        message:"Interview reports fetched successfully",
         interviewReports
    })
}



module.exports = { generateInterViewReportController , generateInterviewReportByIdController ,getAllInterviewReport }