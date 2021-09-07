// load all modules
let express = require("express");
let bodyParser = require("body-parser");
let mongoose = require("mongoose");
let cors = require("cors");

let courseRouter = require("./router/course.router");

let courseModel = require("./model/course.model");
const storage = require('node-sessionstorage')



// create reference of express
let app = express();

// add middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// database url
let url = "mongodb://localhost:27017/Phase3_Mongoose_ExpressJS"

// make a connection to the database
mongoose.connect(url).then(res => console.log("connected")).catch(error => console.log(error));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "\\index.html");
});

app.get("/add", (req, res) => {
    res.sendFile(__dirname + "\\addCourse.html");
});

app.post("/addcourse", (res, req) => {
    let crse = res.body;
    const course = new courseModel({
        _id: crse.cId,
        cName: crse.cName,
        cDesc: crse.cDesc,
        cAmount: crse.cAmount
    });
    console.log(course);
    try {
        courseModel.insertMany(course, (err, result) => {
            if (!err) {
                // req.send("Course stored successfully!");
                req.sendFile(__dirname + "\\index.html");
            } else {
                req.send(err);
            }
        });
    } catch (error) {
        console.log(error);
    }
});

app.get("/update", (req, res) => {
    res.sendFile(__dirname + "\\updateCourse.html");
});
app.post("/updatecourse", (res, req) => {
    // console.log(res.body);
    try {
        courseModel.updateOne({ _id: res.body.cId }, { $set: { cAmount: res.body.cAmount } }, (err, result) => {
            if (!err) {
                // req.send("Course updated successfully");
                req.sendFile(__dirname + "\\index.html");
            } else {
                req.send(err);
            }
        });
    } catch (error) {
        console.log(error);
    }
});

app.get("/delete", (req, res) => {
    res.sendFile(__dirname + "\\deleteCourse.html");
});

app.post("/deletecourse", (res, req) => {
    // console.log(res.body.cId);
    try {
        courseModel.deleteOne({ _id: res.body.cId }, (err, result) => {
            if (!err) {
                // req.send(result);
                req.sendFile(__dirname + "\\index.html");
            } else {
                req.send(err);
            }
        });
    } catch (error) {
        console.log(error);
    }
});


app.get("/getall", (req, res) => {
    try {
        courseModel.find({}, (err, data) => {
            if (!err) {
                let table = `<div>
                <table border="1">`;
                table += `<tr>
                                    <th>Course ID</th>
                                    <th>Course Name</th>
                                    <th>Course Description</th>
                                    <th>Amount</th>
                                </tr>`
                for (let i = 0; i < data.length; i++) {
                    table += `  <tr>
                                        <td>${data[i]._id}</td>
                                        <td>${data[i].cName}</td>
                                        <td>${data[i].cDesc}</td>
                                        <td>${data[i].cAmount}</td>
                                    </tr>`
                }
                table += `</table></div>`;
                // storage.setItem("allCourses", tableHeadder);
                res.send(table);
                // res.json(data);
            }
            else {
                res.json(err);
            }
        });
    } catch (error) {
        console.log(error);
    }
});

app.listen(9090, () => console.log("server running on http://localhost:9090 "))