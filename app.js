
const express = require("express");
const bodyParser = require("body-parser")
const https = require("https");

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));


app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html")
});


app.post("/", function (req,res) {
    console.log("Post request received");

    const apikey = "3c519881ab0249a0812f3f4f57bf7054";
    const textInput = req.body.textInput;

    var docInputUrl = "";
    docInputUrl = req.body.urlInput;
    const sentences = req.body.inputSentences;
    if (docInputUrl != "") {
        var url = "https://api.meaningcloud.com/summarization-1.0?key=" + apikey + "&sentences=" + sentences + "&url=" + docInputUrl;
    }
    else{
        var url = "https://api.meaningcloud.com/summarization-1.0?key=" + apikey + "&sentences=" + sentences + "&txt=" + textInput;
    }
    

        
    // To get the data from server 
    https.get(url, function (response) {
        // Check status code
        console.log(response.statusCode);

        // To get the data from server 
        response.on("data", function (data) {
            // console.log(data);

            // Parse the data and convert into a JSON format
            const outputData = JSON.parse(data);
            

            res.write("<h1>Output</h1>");
            res.write(outputData.summary);
            console.log(outputData.msg);


            // When send is called the server stops at this point so we use "write" in order to write data instead of send 
            res.send()
        });

    });
});




app.listen(3000, function () {
    console.log("Server is running on port 3000");
});


