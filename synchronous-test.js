const fs = require('fs');
const async = require('async');

files = ["simple-sample1.html", "simple-sample2.html", "simple-sample3.html"];

async.map(files, fs.readFile, function (err, data) {
    for(let file of files) {
        console.log( file.toString() );
    }
});
