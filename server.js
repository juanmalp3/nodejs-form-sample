// Server-side code
/* jshint node: true, curly: true, eqeqeq: true, forin: true, immed: true, indent: 4, latedef: true, newcap: true, nonew: true, quotmark: double, undef: true, unused: true, strict: true, trailing: true */
"use strict";

// Depends
var express = require("express");
var bodyParser = require("body-parser");
var morgan = require("morgan");

// Initialize
var httpPort = 8080;
var app = express();
app.use(morgan("dev"));
app.use(express.static("./"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Function to add two numbers
function addition(one, two) {
   return parseInt(one) + parseInt(two);
}

// Function to start server
function startServer() {
    // Listen on http port
    app.listen(httpPort, function() {
        console.log("==> Starting Express server on httpPort", httpPort);
    }).on("error", function(err) {
        if (err.errno === "EADDRINUSE") {
            console.log(":: Port", httpPort, "busy. Unable to start Express server");
            console.log(":: To debug: $ lsof -i :" + httpPort);
            process.exit(1);
        }
        else if (err) {
            console.log(err);
            process.exit(1);
        }
    });

    // Listen for POST request
    app.post("/add", function(req, res) {
        var one = req.body.num1;
        var two = req.body.num2;
        console.log(":: request", one, two);
        var result = addition(one, two);
        console.log(":: response", result);
        // Pass back to client
        res.send("==> Result equals: " + result);
    });
}

startServer();
