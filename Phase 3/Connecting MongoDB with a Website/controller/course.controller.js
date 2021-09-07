const res = require("express/lib/response");
let courseModel = require("../model/course.model");


let addCourseDetails = (req, res) => {
    let course = req.body;
    console.log(course);
    courseModel.insertMany(course, (err, result) => {
        if(!err) {
            req.send("Course stored successfully!");
        } else {
            res.send(err);
        }
    })
}

let getAllCourseDetails = (req, res) => {
    courseModel.find({}, (err, data) => {
        if(!err) {
            res.json(data);
        } else {
            re.json(err);
        }
    })
}

let updateCourseDetails = (req, res) => {
    let course = req.body;
    courseModel.updateOne({_id: course.cid},{$set: {cAmount:course.cAmount}} , (err, result) => {
        if(!err) {
            res.send(result);
        } else {
            res.send(err);
        }
    });
}

let deleteCoursetDetails = (req, res) => {
    let cid = req.params.cid;
    courseModel.deleteOne({_id: cid}, (err, result) => {
        if(!err) {
            res.send(result);
        } else {
            res.send(err);
        }
    });
}


// export these functions to use in router
module.exports = { addCourseDetails, getAllCourseDetails, updateCourseDetails, deleteCoursetDetails }