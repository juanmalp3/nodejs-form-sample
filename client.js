// Client-side code
/* jshint browser: true, jquery: true, curly: true, eqeqeq: true, forin: true, immed: true, indent: 4, latedef: true, newcap: true, nonew: true, quotmark: double, undef: true, unused: true, strict: true, trailing: true */
/* global console: true */

var main = function() {
    "use strict";

    // Toggle submit button
    function toggleForm(state) {
        if (state) {
            $("input[name='add']").prop("disabled", false);
        }
        else {
            $("input[name='add']").prop("disabled", true);
        }
    }

    // Enable submit button only if both inputs filled in
    function validateForm() {
        console.log("foo", $("#num1").val(), "bar", $("#num2").val());
        if ($("#num1").val() === undefined || $("#num1").val() === null || $("#num1").val() === "") {
            console.log(":: missing value num1");
            toggleForm(false);
        }
        else if ($("#num2").val() === undefined || $("#num2").val() === null || $("#num2").val() === "") {
            console.log(":: missing value num2");
            toggleForm(false);
        }
        else {
            $("input[name='add']").prop("disabled", false);
            console.log(":: enabled form");
            toggleForm(true);
        }
    }

    // Send POST request via ajax
    function handlePOST(url, obj, json) {
        $.ajax({
            type: "POST",
            url: url,
            timeout: 2000,
            data: json,
            success: function(data) {
                // Get result data
                console.log(data);
                $(obj).text(data);
            },
            error: function (result) {
                console.log(":: ajax error " + result.status);
            }
        });
    }

    // Disable submit button on page load
    toggleForm(false);

    // Listen for user form input
    $($("#num1, #num2").keyup(function() {
        validateForm();
    }));

    // Manually handle submission
    $("form").on("submit", function(e) {
        // Stop page from reloading
        e.preventDefault();
        var json = { "num1": $("#num1").val(), "num2": $("#num2").val() };
        handlePOST("/add", "#addResult", json);
    });
};

$(document).ready(main);
