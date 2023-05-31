const islogin = async (req, res, next) => {
  // console.log("hello")

  const { token } = req.cookies;
  //console.log(token)
  if (token) {
    res.redirect("/dashboard");
  }
  next();
};

module.exports = { islogin };
