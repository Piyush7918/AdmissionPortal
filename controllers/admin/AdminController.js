const CourseModel = require("../../model/Course")
const nodemailer = require("nodemailer")

class AdminController{



    static dashboard = async(req,res)=>{
        try{
            const {name,email,id, image} = req.user

            const data = await CourseModel.find()
            //console.log(course)
             res.render('admin/dashboard',{n:name,i:image,d:data})
        }catch(error){
            console.log(error)
        }
    }


    static Admin_view = async(req,res)=>{
        try{
            const {name,email,id, image} = req.user
            //console.log(req.params.id)
            const data = await CourseModel.findById(req.params.id)
            //console.log(data);
            res.render('admin/view',{b:data,n:name,i:image})
                  
        } catch(error){
            console.log(error)
        }
    }

    static admin_delete = async (req,res)=>{
        try{
            const result = await CourseModel.findByIdAndDelete(req.params.id)
            req.flash('success','Delete Successfully !')
            res.redirect('/admin/dashboard')
        }catch(error){
            console.log(error)
        }
    }

    static update_approve = async (req,res)=>{
        try{
            //console.log(req.body)
            const {name,course,email,comment,status}=req.body

            const result = await CourseModel.findByIdAndUpdate(req.params.id,{
                comment : req.body.comment,
                status: req.body.status
            })
            this.SendEmail(comment,status,course,name,email)
            req.flash('success','Update  Successfully !')
            res.redirect('/admin/dashboard')
        }catch(error){
            console.log(error)
        }
    }

    static SendEmail = async (comment,status,course,name,email) => {
        
        //console.log("course")
        //console.log(email)
        // 1RHfz85p4XfEue4Juv
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: '19singhpiyush99@gmail.com',
                pass: 'zdsmwikxgawsxgul'
            },
          });
        
          // send mail with defined transport object
          let info = await transporter.sendMail({
            from: '"19singhpiyush99@gmail.com" <19singhpiyush99@gmail.com>', // sender address
            to: email, // list of receivers
            subject: "Hello ✔", // Subject line
            text: "Hello world?", // plain text body
            html: `${name} your ${course} course  ${status} successfully, <br><b>${comment}</b>`, // html body
          });
        
    
}




}
module.exports = AdminController