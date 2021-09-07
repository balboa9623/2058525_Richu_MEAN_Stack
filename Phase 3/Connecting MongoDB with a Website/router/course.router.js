let express = require("express");

// This is used to create router reference which helps to route
// the controller function based upon the path
let router = express.Router();

let courseController = require("../controller/course.controller");

// sub-path
// http://localhost:9090/api/course/getAllCourses
router.get("/getAllCourses", courseController.getAllCourseDetails);
// http://localhost:9090/api/course/storeCourses
router.post("/storeCourses", courseController.addCourseDetails);
// http://localhost:9090/api/course/deleteCourse/102
router.delete("/deleteCourse/:cid", courseController.deleteCoursetDetails);
// http://localhost:9090/api/course/updateCourse
router.put("/updateCourse", courseController.updateCourseDetails);

module.exports = router;