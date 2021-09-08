// load the express module 
let express = require("express");
const readline = require("readline-sync");
const storage = require('node-sessionstorage');
let mongoose = require("mongoose");

mongoose.pluralize(null);

// USING THE PREVIOUS PROJECT'S(Connecting MongoDB to the Website) DATABASE BUT DIFFERENT COLLECTION
let url = "mongodb://localhost:27017/Phase3_Mongoose_ExpressJS";

// make a connection to the database
mongoose.connect(url).then(res => console.log("connected to database")).catch(error => console.log(error));

// create the reference of express module 
let app = express();


let conversation = "";
let len = 0;
let date = new Date();

let routineReply = {
    weather: "It's sunny today. Enjoy the rest of your day",
    time: "The time is " + date.getHours() + ":" + date.getMinutes(),
    hru: "I'm great. Thanks for asking.",
    alarm: "Your alarm is set for 8:30 am every weekday."
}

let routineTerms = ["weather", "time", "hru", "alarm"]

// then load the express-ws module and create the reference 
//of express-ws with the help of express reference using 
// IIFE
let ws = require("express-ws")(app);

// open the html static web page 
app.get("/", (req, res) => {
    res.sendFile(__dirname + "\\index.html");
});

// defining the schema
let messageSchema = mongoose.Schema({
    name: String,
    message: String
});

// create model using schema
let messageModel = mongoose.model("ClientMessage", messageSchema);

app.ws("/", (socket, request) => {

    // recieve message from client application 
    socket.on("message", (msg) => {
        let JsonMsgObject = JSON.parse(msg)
        // console.log(JsonMsgObject.name);


        let clientMessage = new messageModel({
            name: JsonMsgObject.name,
            message: JsonMsgObject.message,
        });

        msg = JsonMsgObject.name + ": " + JsonMsgObject.message
        console.log(msg);
        let tmpMsg = msg.toLowerCase();
        let autoResponceKeywords = tmpMsg.split(" ");
        let word = "";

        for (const itr of autoResponceKeywords) {
            for (const w of routineTerms) {
                if (itr == w) {
                    word = itr;
                    break;
                }
            }
            if (word !== "") {
                break;
            }
        }

        if (word !== "") {
            conversation += msg + "\n";
            conversation += "Friday : " + routineReply[word] + "\n\n";
            word = ""
        } else {
            conversation += msg + "\n";
            let input = readline.question("Enter your response: ");
            conversation += "Friday : " + input + "\n\n";
            word = "";
        }
        messageModel.insertMany(clientMessage, (err, result) => {
            // if(!err) {
            //     console.log(result);
            // } else {
            //     console.log(err);
            // }
        });

        socket.send(conversation);

    });
    // mongoose.disconnect();
});

app.listen(9090, () => console.log("Server running on http://localhost:9090 "))

