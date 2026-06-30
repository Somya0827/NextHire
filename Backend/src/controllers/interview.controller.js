const pdfParse = require("pdf-parse")
const generateInterviewReport = require("../services/ai.service")
const interviewReportModel = require("../models/interviewReport.model")


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



module.exports = { generateInterViewReportController }