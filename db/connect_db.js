const mongoose = require('mongoose')
const url = "mongodb://127.0.0.1:27017/admissionportal"

const live_Url = "mongodb+srv://19singhpiyush99:piyush7918@cluster0.i78kqkc.mongodb.net/admission_portal?retryWrites=true&w=majority"

const connectDB=()=>{
    // For local DB
    return mongoose.connect(live_Url)


    // For cloud DB
    // return mongoose.connect(database)
    
    .then(()=>{
        console.log("Connected Succeessfully")
    })
    .catch((error)=>{
        console.log(error)
    })
}
module.exports=connectDB