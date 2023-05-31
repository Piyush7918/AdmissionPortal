const express = require("express");
const CourseController = require("../controllers/CourseController");
const FrontController = require("../controllers/FrontController");
const { checkuserauth } = require("../middleware/auth");
const { islogin } = require("../middleware/islogin");
const AdminController = require("../controllers/admin/AdminController");
const router = express.Router();

//route path FrontController
router.get("/", islogin, FrontController.login);
router.get("/registerassion", FrontController.register);
router.post("/insert", FrontController.insert);
router.get("/dashboard", checkuserauth, FrontController.dashboard);
router.post("/veryfy_login", FrontController.verify_login);
router.get("/logout", FrontController.logout);
router.get("/profile", checkuserauth, FrontController.profile);
router.get("/contact", checkuserauth, FrontController.contact);
router.get("/about", checkuserauth, FrontController.about);
router.post("/change_password", checkuserauth, FrontController.change_password);
router.post("/profile_update", checkuserauth, FrontController.profile_update);


//coursecontroller

router.post("/courseinsert", checkuserauth, CourseController.courseinsert);
router.get("/course_display", checkuserauth, CourseController.Course_display);
router.get("/course_view/:id", checkuserauth, CourseController.Course_view);
router.get("/course_edit/:id", checkuserauth, CourseController.Course_edit);
router.post("/course_update/:id", checkuserauth,CourseController.Course_update);
router.get("/course_delete/:id", checkuserauth, CourseController.course_delete);

//admin Controller
router.get("/admin/dashboard", checkuserauth, AdminController.dashboard);
router.get("/admin_view/:id", checkuserauth, AdminController.Admin_view);
router.get("/admin_delete/:id", checkuserauth, AdminController.admin_delete);
router.post("/update_approve/:id", checkuserauth, AdminController.update_approve);

module.exports = router;
