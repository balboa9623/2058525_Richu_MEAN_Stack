let fs = require("fs");
let readline = require("readline-sync");
let fname = readline.question("Enter your first name: ");
let lname = readline.question("Enter your last name: ");
let gender = readline.question("Enter your gender: ");
let emailId = readline.questionEMail("Enter your email: ");

let dateTime = new Date();
let date = dateTime.getMonth() + 1 + "/" + dateTime.getDate() + "/" + dateTime.getFullYear();
let time = dateTime.getHours() + ":" + dateTime.getMinutes() + ":" + dateTime.getSeconds();

if (fname.length == 0 || lname.length == 0 || gender.length == 0 || emailId.length == 0) {
    console.log("One or more fields are empty. Terminating the program now. Please re-run the program.");
    return;
}

let filename = "people.json"
gender = gender.charAt(0).toUpperCase();

let person = { firstName: fname, lastName: lname, gender: gender, email: emailId, loggedDate: date, loggedTime: time };

debugger;

if (fs.existsSync(filename)) { // file exist
    let data = fs.readFileSync(filename).toString();

    debugger;

    if (data.length == 0) { // file exist, but no data
        let people = []
        people.push(person);

        addDataToJson(filename, people);

        // *****************************
        // fs.writeFile("people.json", JSON.stringify(people), { flag: "a+" }, (err) => {
        //     if (!err) {
        //         console.log("Data store in file");
        //     }
        // })
        // *****************************
    } else { // file does not exist
        let people = JSON.parse(data);
        people.push(person);
        fs.writeFile(filename, JSON.stringify(people), (err) => {
            if (!err) {
                console.log("Data store in file");
            }
        })
    }

} else { // file doesnot exist. Create one and add data
    let people = []
    people.push(person);
    addDataToJson(filename, people);
    // *****************************
    // fs.writeFile("people.json", JSON.stringify(people), { flag: "a+" }, (err) => {
    //     if (!err) {
    //         console.log("Data store in file");
    //     }
    // })
    // *****************************
}

function addDataToJson(filename, people) {
    debugger;
    fs.writeFile(filename, JSON.stringify(people), { flag: "a+" }, (err) => {
        debugger;
        if (!err) {
            console.log("Data store in file");
        }
    })
}