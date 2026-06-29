const jwt = require("jsonwebtoken");
const tokenBlacklistModel = require("../models/blacklist.model")

async function authUser(req, res, next) {
    const token = req.cookies.token

    if (!token) {
        return res.status(401).json({
            message: "Token Not Provided"
        })
    }

    const isTokenBlacklisted = await tokenBlacklistModel.findOne({ token })

    if (isTokenBlacklisted) {
        return res.status(401).json({
            message: "Token id invalid"
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded
        // console.log(req.user);
        next()

    } catch (err) {
        return res.status(401).json({
            message: "Invalid Token"
        })
    }

}

module.exports = { authUser };