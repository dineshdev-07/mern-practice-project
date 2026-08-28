const express = require('express')
const dotenv = require('dotenv')
const port = 5000;

const app = express()

app.use(express.json())

app.use('/api/goals', require('./routes/goalroutes'))

app.listen(port, ()=> {
    console.log(`Server is Running on ${port}`)
})