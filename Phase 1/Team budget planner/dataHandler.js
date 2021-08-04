let projectData = []

function addData() {
    if (projectData.length === 0) {

        var clientName = document.getElementById("clientName").value
        var projName = document.getElementById("projectName").value
        var budget = document.getElementById("budget").value || -1
        budget = parseFloat(budget)


        if (clientName.length === 0 || projName.length === 0 || budget <= -1) {
            alert("One or more fields are empty...")
            return false;
        }


        // convert to data object
        var projObj = { client_name: clientName, proj_name: projName, budget: budget }

        // convert data object to json sting
        var jsonString = JSON.stringify(projObj)
        var jsonObj = JSON.parse(jsonString); // parse json string to json object


        projectData.push(jsonObj) // add json object to array
        sessionStorage.setItem("sessionData", JSON.stringify(projectData))
        localStorage.setItem("localData", JSON.stringify(projectData))

        // console.log(projectData);
    } else {

        var clientName = document.getElementById("clientName").value
        var projName = document.getElementById("projectName").value
        var budget = document.getElementById("budget").value || -1
        budget = parseFloat(budget)

        if (clientName.length === 0 || projName.length === 0 || budget <= -1) {
            alert("One or more fields are empty...")
            return false;
        }

        var projObj = { client_name: clientName, proj_name: projName, budget: budget }
        var jsonString = JSON.stringify(projObj)
        var jsonObj = JSON.parse(jsonString);

        let duplicate = false;
        // check if array already contains the data
        for (let i = 0; i < projectData.length; i++) {
            if (projectData[i].proj_name === projName) {
                duplicate = true;
                break;
            }
        }

        // if duplicate is not found add the data
        if (!duplicate) {
            projectData.push(jsonObj)
            sessionStorage.setItem("sessionData", JSON.stringify(projectData))
            localStorage.setItem("localData", JSON.stringify(projectData))
        }
        // console.log(projectData);
    }

}

function clearInput() {
    document.getElementById("clientName").value = ""
    document.getElementById("projectName").value = ""
    document.getElementById("budget").value = ""
}

function displayData() {
    /*

    // implementation using localStorage

    let localData = localStorage.getItem("localData")
    let localJsonData = JSON.parse(localData)

    var tableHead = "<table border=1 ><tr> <th>Client name</th> <th>Project name</th> <th>Budget</th>"
    var tableContent = ""

    for (let i = 0; i < localJsonData.length; i++) {
        tableContent += "<tr> <td>" + localJsonData[i].client_name + "</td> <td>" + localJsonData[i].proj_name + "</td> <td>" + localJsonData[i].budget + "</td> </tr>"
    }
    var tableEnd = "</table>"
    tableContent = tableHead + tableContent + tableEnd
    document.getElementById("dispBudget").innerHTML = tableContent
    */


    // implementation using sessionStorage
    let sessionData = sessionStorage.getItem("sessionData")
    let sessionJsonData = JSON.parse(sessionData)

    console.log(sessionJsonData);

    var tableHead = "<table class='table'><thead><tr> <th>Client name</th> <th>Project name</th> <th>Budget</th> </tr> </thead>"
    var tableContent = ""

    for (let i = 0; i < sessionJsonData.length; i++) {
        tableContent += "<tr> <td>" + sessionJsonData[i].client_name + "</td> <td>" + sessionJsonData[i].proj_name + "</td> <td>" + sessionJsonData[i].budget + "</td> </tr>"
    }

    var tableEnd = "</table>"
    tableContent = tableHead + tableContent + tableEnd
    document.getElementById("dispBudget").innerHTML = tableContent

}