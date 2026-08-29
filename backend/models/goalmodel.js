const { text } = require('express')
const { Timestamp } = require('mongodb')
const mongoose = require('mongoose')

const goalSchema = mongoose.Schema(
    {
        text:{
            type:String,
            required:[true, ' Add Text Value']
        }
    },
    {
        Timestamp:true,
    }
)

module.exports = mongoose.model('Goal',goalSchema)