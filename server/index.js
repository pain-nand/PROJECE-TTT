const express = require("express")
require("dotenv").config()
const cors = require("cors")
const cookieParser = require("cookie-parser")
const apiRouter = require("./routes/index")
const connectDB = require("./config/db.config")
const app = express()
const PORT = process.env.PORT || 4000

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())
app.use(cookieParser())
app.use("/api", apiRouter)
app.use((error, req, res) => {
    console.error(error)
    return res.status(500).json({error: "Internal server error"})
})
app.listen(PORT, () => {
    console.log(`server was started on ${PORT} PORT`)
    connectDB()
})