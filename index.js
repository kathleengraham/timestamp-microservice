// making our constant variables
// 
const express = require('express');
const app = express();
const port = 8080;

// show index.html or style.css
app.use(express.static('public'))

// index.html
app.get("/", function (req, res) {
    res.sendFile(__dirname + '/index.html');
  });

// get request date for timestamp microservice
app.get('/api/timestamp/:date_string?', (req, res) => {
    var date = req.params.date_string;
    var dateTime;
    
    if (typeof date === "undefined") {
        date = new Date();
    } else {
        date = new Date(date);
    }
    
    var dateUTC = date.toUTCString();

    if (dateUTC === "Invalid Date") {
        dateTime = {"error":"Invalid Date"};
    } else {
        dateTime = {"unix":date.getTime(), "utc": dateUTC};
    }
    
    res.json(dateTime)
});

// get express object and listen to the call
app.listen(port, () => console.log(`Timestamp Microservice is listening on port ${port}!`));

