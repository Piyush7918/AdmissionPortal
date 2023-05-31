const jwt = require("jsonwebtoken");
const UserModel = require("../model/user");

const checkuserauth = async (req, res, next) => {
  // console.log("hello")

  const { token } = req.cookies;
  //console.log(token)
  if (!token) {
    req.flash("error", "Unothorised user.");
    res.redirect("/");
  } else {
    const verify = jwt.verify(token, "ghsdghds123dhdhg7272bb");
    //console.log(verify)
    const user = await UserModel.findById(verify.ID);
    //console.log(user)
    req.user = user;
    next();
  }
};

module.exports = { checkuserauth };
