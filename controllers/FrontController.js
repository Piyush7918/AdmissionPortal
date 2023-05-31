const CourseModel = require("../model/Course");
const UserModel = require("../model/user");
const bcrypt = require("bcrypt");
const cloudinary = require("cloudinary").v2;
const jwt = require("jsonwebtoken");

cloudinary.config({
  cloud_name: 'dohun5xgh',
  api_key: '496119554365172',
  api_secret: 'ybc1bUWsVt93lNvgturdfImj4Ak',
  secure: true
});


class FrontController {
  static dashboard = async (req, res) => {
    try {
      //console.log(req.user)
      const { name, email, id, image } = req.user;
      const btech = await CourseModel.findOne({ user_id: id, course: "btech" });
      const bca = await CourseModel.findOne({ user_id: id, course: "BCA" });
      const mca = await CourseModel.findOne({ user_id: id, course: "MCA" });
      res.render("dashboard", {
        n: name,
        i: image.url,
        e: email,
        b: btech,
        bc: bca,
        mc: mca,
      });
    } catch (error) {
      console.log(error);
    }
  };

  static login = async (req, res) => {
    res.render("login", {
      message: req.flash("success"),
      error: req.flash("error"),
    });
  };

  static contact = async (req, res) => {
    try {
      const { name, email, id, image } = req.user;
      res.render("contact", { n: name, i: image.url });
    } catch (error) {
      console.log(error);
    }
  };

  static about = async (req, res) => {
    try {
      const { name, email, id, image } = req.user;
      res.render("about", { n: name, i: image.url });
    } catch (error) {
      console.log(error);
    }
  };

  static register = async (req, res) => {
    try {
      const data = await CourseModel.find();
      res.render("registerassion", { message: req.flash("error") });
    } catch (error) {
      console.log("error");
    }
  };

  static insert = async (req, res) => {
    // console.log(req.files.image)
    const file = req.files.image;
    const myimage = await cloudinary.uploader.upload(file.tempFilePath, {
      folder: "studentimage",
    });
    //console.log(imageUpload)
    try {
      const { name, email, p_number, password, confirm_password } = req.body;

      const user = await UserModel.findOne({ email: email });
      //console.log(user);
      if (user) {
        req.flash("error", "email already exist.");
        res.redirect("/registerassion");
      } else {
        if (name && email && password && confirm_password) {
          if (password == confirm_password) {
            try {
              const hashpassword = await bcrypt.hash(password, 10);
              const result = new UserModel({
                name: name,
                email: email,
                p_number: p_number,
                password: hashpassword,
                image: {
                  public_id: myimage.public_id,
                  url: myimage.secure_url,
                },
              });
              //console.log(result)
              await result.save();
              req.flash(
                "success",
                "Registration Successfully please login here !"
              );
              res.redirect("/");
            } catch (error) {
              console.log(error);
            }
          } else {
            req.flash("error", "password and confirm password does not match.");
            res.redirect("/registerassion");
          }
        } else {
          req.flash("error", "All field are required.");
          res.redirect("/registerassion");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  static verify_login = async (req, res) => {
    try {
      //console.log(req.body)
      const { email, password } = req.body;
      if (email && password) {
        const user = await UserModel.findOne({ email: email });
        //console.log(user)
        if (user != null) {
          const ismatch = await bcrypt.compare(password, user.password);
          if (ismatch) {
            //multiple login
            if (user.role == "student") {
              const token = jwt.sign(
                { ID: user._id },
                "ghsdghds123dhdhg7272bb"
              );
              //console.log(token)
              res.cookie("token", token);
              res.redirect("/dashboard");
            }
            if (user.role == "admin") {
              const token = jwt.sign(
                { ID: user._id },
                "ghsdghds123dhdhg7272bb"
              );
              //console.log(token)
              res.cookie("token", token);
              res.redirect("/admin/dashboard");
            }
            //generate token
          } else {
            req.flash("error", "Email or Password is not valid.");
            res.redirect("/");
          }
        } else {
          req.flash("error", "You are not resistered a user.");
          res.redirect("/");
        }
      } else {
        req.flash("error", "All field are required.");
        res.redirect("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  static logout = async (req, res) => {
    try {
      res.clearCookie("token");
      res.redirect("/");
    } catch (error) {
      console.log("error");
    }
  };

  static profile = async (req, res) => {
    try {
      const { name, email, p_number, id, image } = req.user;
      res.render("profile", {
        n: name,
        i: image.url,
        e: email,
        p: p_number,
        error: req.flash("error"),
      });
    } catch (error) {
      console.log(error);
    }
  };

  static change_password = async (req, res) => {
    try {
      const { name, email, id, image } = req.user;
      const { old_password, new_password, cpassword } = req.body;
      if (old_password && new_password && cpassword) {
        const user = await UserModel.findById(id);
        const ismatch = await bcrypt.compare(old_password, user.password);
        if (!ismatch) {
          req.flash("error", "Old password is incorrect.");
          return res.redirect("/profile");
        } else {
          if (new_password !== cpassword) {
            req.flash("error", "Password and confirm password do not match.");
            return res.redirect("/profile");
          } else {
            const newHashpassword = await bcrypt.hash(new_password, 10);
            await UserModel.findByIdAndUpdate(id, {
              $set: { password: newHashpassword },
            });
            req.flash(
              "success",
              "Password changed successfully. Please log in with your new password."
            );
            return res.redirect("/logout");
          }
        }
      } else {
        req.flash("error", "All fields are required.");
        return res.redirect("/profile");
      }
    } catch (error) {
      console.log(error);
    }
  }
  static profile_update = async (req, res) => {
    try {
        //console.log(req.files.image)
        if (req.files) {
            const user = await UserModel.findById(req.user.id);
            const image_id = user.image.public_id;
            await cloudinary.uploader.destroy(image_id);

            const file = req.files.image;
            const myimage = await cloudinary.uploader.upload(file.tempFilePath, {
                folder: "studentimage",

            });
            var data = {
                name: req.body.name,
                email: req.body.email,
                image: {
                    public_id: myimage.public_id,
                    url: myimage.secure_url,
                },
            };
        } else {
            var data = {
                name: req.body.name,
                email: req.body.email,

            }
        }
        const update_profile = await UserModel.findByIdAndUpdate(req.user.id, data)
        res.redirect('/profile')
    } catch (error) {
        console.log(error)
    }
}
}
module.exports = FrontController
