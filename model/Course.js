const mongoose = require('mongoose')


//define schema
const CourseSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    mobile_number:{
        type:String,
        require:true
    },
    address:{
        type:String,
        require:true
    },
    gender:{
        type:String,
        require:true
    },
    qualification:{
        type:String,
        require:true
    },
    course:{
        type:String,
        require:true
    },
    user_id:{
        type:String,
        require:true
    },
    status:{
        type:String,
        default:"Pending"
    },
    comment:{
        type:String,
    }
    
},{timestams:true})


//create  collection

const CourseModel = mongoose.model('course',CourseSchema)

module.exports = CourseModel