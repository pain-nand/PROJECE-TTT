const UserModel = require("../models/User.model")
const jwt = require("jsonwebtoken")

const generateTokens = (userId) => {
    const accessToken = jwt.sign({ userId }, process.env.ACCESS_TOKEN_KEY, {
        expiresIn: '15m'
    })
    const refreshToken = jwt.sign({ userId }, process.env.REFRESH_TOKEN_KEY, {
        expiresIn: "7d"
    })
    return { accessToken, refreshToken }
}

const setcookies = (res, accessToken, refreshToken) => {
    res.cookie("access_token", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 15 * 60 * 1000
    })
    res.cookie("refresh_token", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24* 60* 60 * 1000
    })

}

const signupController = async (req, res) => {
    try {
        const { name, email, password } = req.body
        const userExists = await UserModel.findOne({ email })

        if (userExists) {
            return res.status(400).json({ error: "User already exists" })
        }
        const user = await UserModel.create({
            name, email, password
        })
        const { accessToken, refreshToken } = generateTokens(user._id)
        setcookies(res, accessToken, refreshToken)
        return res.status(200).json({
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.roles
            },
            messasge: "Account created successfully"
        })
    }
    catch (error) {
        next(error)
    }
}

const signinController = async (req, res) => {
   try {

   }
   catch(error) {
    next(error)
   }
}
const logoutController = async (req, res) => {
    res.send('working')
}
const refreshTokenController = async (req, res) => {
    res.send('working')
}
const profileController = async (req, res) => {
    res.send('working')
}
module.exports = {
    signupController,
    signinController,
    logoutController,
    refreshTokenController,
    profileController
}