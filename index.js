require('dotenv').config()
const express = require('express')
const cors = require('cors')
const paginate = require('express-paginate')
const passport = require('passport')
const { connect } = require('mongoose')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(passport.initialize())
app.use(paginate.middleware(process.env.LIMIT, process.env.MAX_LIMIT))

const runApp = async () => {
    try {
        await connect(process.env.MONGO_URI)
        console.log(`Connected to database ${process.env.MONGO_URI}`)
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`)
        })
    } catch (error) {
        console.log(error)
    }
}

runApp()