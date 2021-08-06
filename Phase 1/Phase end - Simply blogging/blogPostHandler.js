let blogArr = []
localStorage.setItem("blogArr", JSON.stringify(blogArr))

function addBlog() {

    var title = document.getElementById("title").value
    var article = document.getElementById("article").value
    if (!title || !article) {
        // alert("Title and Atricle fields are empty. Please fill them.")
        document.getElementById("displayBlogs").innerHTML = "<div class='alert alert-warning' role='alert'>Title and Atricle fields are empty. Please fill them out! (image is optional)</div>"
        return;
    }

    var imagePath = ""
    if (document.getElementById("image").value) {
        imagePath = document.getElementById("image").value
        console.log(imagePath);
    }

    blogArr.push({
        _title: title,
        _article: article,
        _imagePath: imagePath
    })
    blogArr = blogArr.reverse()

    var jsonString = JSON.stringify(blogArr)
        // console.log(jsonString);
    localStorage.setItem("blogArr", jsonString)

    // var locStor = localStorage.getItem("blogArr")
    // console.log(JSON.parse(locStor));

    display()

}

function display() {
    let localData = localStorage.getItem("blogArr")
    let localJsonData = JSON.parse(localData)
        // console.log(localJsonData.length);

    if (localJsonData == null) {
        document.getElementById("displayBlogs").innerHTML = "No blogs posts yet!!"
    } else {
        var card = "";
        // var x= 0;
        for (let i = 0; i < localJsonData.length; i++) {

            var cardDivStart = "<div class='card col-sm-2 col-md-4 col-lg-6' style='width: 18rem; margin:10px; background-color: #d5dce6;'> "
            var width = document.getElementsByClassName('card').width;
            var height = document.getElementsByClassName('card').height * .25;
            var cardImage = "";
            if (!localJsonData[i]._imagePath) {
                cardImage = "No image specified"
            } else {
                cardImage = "<img src=" + localJsonData[i]._imagePath + " class='card-img-top' width=" + width + " height=" + height + " alt='image failed to load'>"
            }

            var cardBody = "<div class='card-body'>"
            var cardTitle = "<h5 class='card-title'>" + localJsonData[i]._title + "</h5>"
            var articleContent = "<p class='card-text'>" + localJsonData[i]._article + "</p>"
            var cardBodyEnd = "</div>"
            var cardDivEnd = "</div>"
            card += cardDivStart + cardImage + cardBody + cardTitle +
                articleContent + cardBodyEnd + cardDivEnd;

            // if(x%3==0){
            //     card+="<br>"
            // }
            // x++;
        }
        document.getElementById("displayBlogs").innerHTML = card;
    }
}