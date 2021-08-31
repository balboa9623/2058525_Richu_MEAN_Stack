let http = require('http');
let url = require("url");


let taskDetails = []

let indexPage = `
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        body {
            background-color: #ded9cc;
        }
        
        #add {
            background-color: #4688f2;
            border: 2px solid;
            border-radius: 5px;
            padding: 5px;
            margin-top: 20px;
            margin-bottom: 50px;
            margin-right: 30px;
            color: white;
        }
        
        #reset {
            background-color: #e35232;
            border: 2px solid;
            border-radius: 5px;
            padding: 5px;
            margin-top: 20px;
            margin-bottom: 50px;
            margin-right: 30px;
            color: white;
        }
        
        a {
            margin-left: 60%;
        }
        
        input {
            margin-left: 20px;
        }
        
        h2 {
            display: flex;
            justify-content: center;
        }
        
        form {
            margin-left: 40%;
        }
    </style>
</head>

<body>
    <H2>Task Planner</H2>
    <hr>
    <br>
    <form action="addtask" >
        <label for="eid">Employee Id </label>
        <input type="text" name="eid" id="eid" required>
        <br>
        <label for="taskid">Task Id </label>
        <input type="text" name="taskid" id="taskid" required>
        <br>
        <label for="task">Task </label>
        <input type="text" name="task" id="task" required>
        <br>
        <label for="deadline">Deadline </label>
        <input type="date" name="deadline" id="deadline" required>
        <br>
        <input type="submit" id="add" value="Add Task">
        <input type="reset" id="reset" value="Reset">
    </form>
    <a href="alltask">View all tasks</a>
</body>

</html>
`

// let deletePage = ``

let server = http.createServer((req, res) => {
    let urlInfo = url.parse(req.url, true);

    if (urlInfo.path != "/favicon.ico") {
        if (urlInfo.path == "/") {
            console.log(taskDetails);
            res.write(indexPage);
        }

        if (urlInfo.pathname == "/addtask") {
            let task = urlInfo.query
                // console.log(task);
            if (task.taskid.length === 0) {
                res.write("Empty fields");
            }
            let found = taskDetails.find(e => e.taskid == task.taskid);
            if (!found) {
                taskDetails.push(task);
                // console.log(taskDetails);
                res.write(indexPage);
            } else {
                // console.log(taskDetails);
                res.write("<b>Task already exist</b>");
                res.write(indexPage);
            }
        } else if (urlInfo.pathname == "/alltask") {

            let tableContent = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Document</title>
                <style>
                    body {
                        background-color: #ded9cc;
                    }
                    thead {
                        background-color: #a88a95;
                    }

                    #del {
                        background-color: #e35232;
                        border: 2px solid;
                        border-radius: 5px;
                        padding: 5px;
                        color: white;
                    }
                </style>
            </head>

            <body>
                <a href="/"> << back</a>
                <br>
                <br>
                <table border="1">
                    <thead>
                        <td>Employee ID</td>
                        <td>Task ID</td>
                        <td>Task</td>
                        <td>Deadline</td>
                    </thead>

                    <tbody>


            `
            console.log(taskDetails);
            taskDetails.forEach(ele => {
                tableContent += `
                    <tr>
                        <td>${ele.eid}</td>
                        <td>${ele.taskid}</td>
                        <td>${ele.task}</td>
                        <td>${ele.deadline}</td>
                    </tr>
                `
            });
            tableContent += `
                    </tbody>
                </table>
                <br>
                <br>
                <form action="delete" style="display: flex;
                    justify-content: center;">
                    <input type="text" name="delTaskId" id="delTaskId" placeholder="enter task id you want to delete">
                    <input type="submit" id="del" value="Delete Task" style="margin-left: 20px;">
                </form>
                </body>

</html>
            `
            res.write(tableContent);
        } else if (urlInfo.pathname == "/delete") {
            // console.log(urlInfo.query.delTaskId);

            let delTaskId = urlInfo.query.delTaskId;
            taskDetails = taskDetails.filter(e => e.taskid !== delTaskId);
            console.log(taskDetails);
            res.write(indexPage);
        }
    }
    res.end();
});



server.listen(9090, () => console.log("server is running on port number 'http://localhost:9090' "))