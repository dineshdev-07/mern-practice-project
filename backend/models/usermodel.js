const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({

    name:{
        type:String,
        required:[true,'Add a Name field']
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:[true, 'Enter Password']
    },
},{
    timestamps:true,
})

module.exports = mongoose.model('User',userSchema)