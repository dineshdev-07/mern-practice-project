const mongoose = require('mongoose')

const mongoDB = async () =>{
    try{

const conn = await mongoose.connect(process.env.MONGO_URI)

console.log(`MongoDB connected`.red.underline)

    }catch(error){
        console.log(error)
        process.exit(1)
    }
}

module.exports = mongoDB;