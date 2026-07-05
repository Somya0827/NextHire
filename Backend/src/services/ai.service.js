const { GoogleGenAI, Behavior } = require("@google/genai");
const { z } = require("zod")

const puppeteer = require('puppeteer')

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENAI_API_KEY
})


const interviewReportSchema = z.object({
    matchScore: z.number().describe("A score between 0 and 100 indicating how well the candidate's profile matches the job describe"),
    technicalQuestions: z.array(z.object({
        question: z.string().describe("The technical question can be asked in interview"),
        intention: z.string().describe("The intention of interviewer behind asking this question"),
        answer: z.string().describe("How to answer this question , what points to cover, what approach to take etc.")
    })).describe("Technical questions that can be asked in the interview along with their intention and how to answer them "),
    behavioralQuestions: z.array(z.object({
        question: z.string().describe("The technical question can be asked in interview"),
        intention: z.string().describe("The intention of interviewer behind asking this question"),
        answer: z.string().describe("How to answer this question , what points to cover, what approach to take etc.")
    })).describe("Behavioral questions that can be asked in the interview along with their intention and how to answer them "),
    skillGaps: z.array(z.object({
        skill: z.string().describe("The skill which the candidate is lacking"),
        severity: z.enum(["low", "medium", "high"]).describe("the severity of the skill gap, i.e. how important is the skill for the job and how much it can impact the candidate's chances")
    })).describe("List of skill gaps in the candidate's profile along with their severity"),
    preparationPlan: z.array(z.object({
        day: z.number().describe("The day number in the preparation plan, starting from 1"),
        focus: z.string().describe("The main focus of this day in the preparation plan, e.g. data structures, system design, mock interviews etc."),
        tasks: z.array(z.string()).describe("List of tasks to be done on this day to follow the preparation plan, e.g. read a specific book or article, solve a set of problems, watch a video etc.")
    })).describe("A day-wise preparation plan for the candidate to follow in order to prepare for the interview effectively"),
    title: z.string().describe("The title of the job for which the interview report is generated")



})

const withTimeout = (promise, ms = 90000) => {
    return Promise.race([
        promise,
        new Promise((_, reject) => setTimeout(() => reject(new Error("API Request Timed Out")), ms))
    ]);
};

async function generateInterviewReport({ resume, selfDescription, jobDescription }) {

    const prompt = `Generate an interview report for a candiadte with the following details :
    Resume : ${resume},
    self Description:${selfDescription},
    Job description : ${jobDescription}
    `

    const response = await withTimeout(ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: z.toJSONSchema(interviewReportSchema)
        }
    }), 90000)

    console.log(JSON.parse(response.text))

    return JSON.parse(response.text);
}

async function generatePdfFromHtml(htmlContent) {
    const browser = await puppeteer.launch({
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    await page.setContent(htmlContent, { waitUntil: "networkidle0" })

    const pdfBuffer = await page.pdf({ format: "A4", margin: { top: '12mm', bottom: "12mm", left: '10mm', right: "10mm" } })
    await browser.close()

    return pdfBuffer

}

async function generateResumePdf({ resume, selfDescription, jobDescription }) {
    const resumePdfSchema = z.object({
        html: z.string().describe("The HTML of the resume which can be converted to PDF using any library like puppeteer")
    })

    const prompt = `Generate a resume for a candidate with the following details:
    Resume : ${resume},
    Self Description : ${selfDescription},
    Job Description : ${jobDescription}

    The response should be a JSON object with a single field "html" containing the HTML content of the resume, including styling in a <style> block. The CSS and HTML structure should be tailored to render the PDF perfectly.

    Follow these rules strictly:
    1. **NO CONTENT LOSS:** You MUST NOT skip, drop, or omit any key sections, projects, experiences, achievements, skills, or educational details from the candidate's profile. All major points (especially projects) must be present.
    2. **SINGLE-COLUMN LAYOUT ONLY:** The layout MUST be a standard single-column format spanning the full page width (do NOT use a side-by-side or two-column sidebar layout). All sections (Header, Summary, Experience, Projects, Skills, Education) must stack vertically.
    3. **FIT PERFECTLY ON EXACTLY ONE PAGE (DYNAMIC VERTICAL BALANCE):**
       - The resume must fit on exactly ONE single A4 page. It should not overflow onto a second page, nor should it leave a large empty blank space at the bottom.
       - The styling (font-size, vertical margins, section gaps, and padding) must scale dynamically to fill 90% to 100% of the single page height elegantly.
       - **If there is a lot of content:** Use a compact layout with readable font sizes (base text font size: 11px, subheadings/h2: 13.5px, candidate name/h1: 20px, line-height: 1.25, section gap: 6px to 8px, margin-bottom of headings: 2px) to squeeze everything onto the single page.
       - **If there is less content:** Use a spacious layout with larger font sizes (base text font size: 12.5px or 13px, subheadings/h2: 16px, candidate name/h1: 26px, line-height: 1.4, section gap: 12px to 16px, list spacing: 4px) to fill the empty space and occupy the full A4 page height cleanly without leaving large blank areas at the bottom.
       - Render skills horizontally as a wrapped inline list of tags/comma-separated strings instead of a long vertical list to save space.
       - Ensure job headers use standard flex layouts (e.g., Title on left, Date/Location on right) to cleanly utilize horizontal space.
    4. **ATS & VISUAL DESIGN:**
       - Make it look premium, simple, and clean (use dark slate or navy blue accent colors, standard sans-serif font like Arial or Helvetica).
       - Keep it ATS friendly (well-structured, standard headers, text selectable).
    5. **CLICKABLE LINKS & CONTACT INFO:**
       - Search for the candidate's social links (GitHub, LinkedIn, Portfolio) and contact details (Email, Phone) in the candidate's profile.
       - You MUST render them as styled, clickable anchor tags (e.g. <a>) using proper schemas (href="https://github.com/...", href="https://linkedin.com/in/...", href="mailto:...", href="tel:..."). Do not output them as plain text.
       - Make sure they are not missing and are styled clearly.
    `

    const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: z.toJSONSchema(resumePdfSchema)
        }
    })

    const jsonContent = JSON.parse(response.text)

    const pdfBuffer = await generatePdfFromHtml(jsonContent.html)

    return pdfBuffer;

}

module.exports = { generateInterviewReport, generateResumePdf };