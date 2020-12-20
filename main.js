// Load configuration file
const config = require('./config');

// to build our anchors
const anchors = require('./anchors-aweigh');

// for file manageemnt
const fs = require('fs');
const async = require('async');

const glob = require("glob");

// Arguments
const inputFilename = process.argv[2];
const outputFilename = process.argv[3];

glob(inputFilename, function (err, files) {
    let content;

    if (err) {
        console.log(err);
    } else {
        if (files.length === 0) {
            console.log(err);
            console.log('No files found with \'' + inputFilename + '\'.');
        } else if (files.length === 1) {
            content = fs.readFileSync(inputFilename, 'utf8');
            content = anchors.generateAnchor(content, outputFilename);
            // fs.writeFileSync(outputFilename, content);
            // console.log(`Created: ${outputFilename}`);
        } else {    // for multiple files

            async.map(files, readEachFile, function (err, data) {
                if (err) {
                    console.log(err);
                } else {

console.log(data[0].toString());    // file name

console.log(data.toString());
                    for (let file of files) {
                        console.log('line 37');
                        console.log(file.toString());
                        console.log(data.toString());


                    }
                }
            });

            function readEachFile(file, done) {
                // computing stuff here...

                fs.readFile(file, function (err, data) {

                    if (err) {
                        console.log(err);
                    } else {
                        console.log(`output ${data}`);
                        // content = anchors.generateAnchor(data);
                        // let [fileName, fileExtension] = file.split('.');
                        // fs.writeFileSync(`${config.multiFilePrefix}${fileName}${config.multiFileSuffix}.${fileExtension}`, content);
                        // console.log(`Created: ${file}`);
                    }
                });

                console.log('file');
                console.log(file);
                console.log('done');
                console.log(done);

                done(null, file);
              }


            // files.forEach(function (file) {
            //     fs.readFile(file, function (err, data) {

            //         if (err) {
            //             console.log(err);
            //         } else {
            //             content = anchors.generateAnchor(data);
            //             let [fileName, fileExtension] = file.split('.');
            //             fs.writeFileSync(`${config.multiFilePrefix}${fileName}${config.multiFileSuffix}.${fileExtension}`, content);
            //             console.log(`Created: ${file}`);
            //         }
            //     });
            // });
        }
    }
});