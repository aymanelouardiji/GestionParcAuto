const mongoose = require("mongoose")
const UserSchema = new mongoose.Schema({
  
    phone : {
        type : String ,
    },
    email : {
        type : String ,
        unique : true ,
    },
    firstname : {
        type : String ,
    },
    lastname : {
        type : String ,
    },
    password : {
        type : String ,
    }
    
}, {timestamps : true} ) 

const UserModel = mongoose.model("users",UserSchema) 
module.exports = UserModel

