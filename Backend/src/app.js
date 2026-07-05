const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')

const app = express()


app.use(express.json());
app.use(cookieParser())
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}))


// require all the routes
const authRouter = require("./routes/auth.routes")
const interviewRouter = require("./routes/interview.routes")

//using all the routes here
app.use("/api/auth", authRouter)
app.use("/api/interview", interviewRouter)

app.get("/health", (req, res) => {
    res.json({
        success: true,
        message: "Backend is running"
    });
});

module.exports = app;