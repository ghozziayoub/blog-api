//importing 3rd part libs
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const mongoose = require('./db/config')

const blogController = require("./controllers/blogController")

const app = express()

app.use(bodyParser.json())
app.use(cors())

app.use("/blog", blogController)

const PORT = process.env.PORT || 3000

app.get('/', (req, res) => {
    res.status(200).send("Welcome to the server")
})

app.listen(PORT, () => {
    console.log(`SERVER STARTED ON PORT ${PORT}`);
})