let mongoose = require("mongoose");

// defining the schema
let courseSchema = mongoose.Schema({
    _id: String,
    cName: String,
    cDesc: String,
    cAmount: Number
});
mongoose.pluralize(null);

// create model using schema
let courseModel = mongoose.model("Course", courseSchema);

// export the model so controllers can use
module.exports = courseModel;