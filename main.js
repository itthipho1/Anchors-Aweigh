// Load configuration file
const config = require('./config');

// to build our anchors
const anchors = require('./anchors-aweigh');

// for file manageemnt
const fs = require('fs');
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
            content = anchors.generateAnchor(content);

            fs.writeFileSync(outputFilename, content);
            console.log(`Created: ${outputFilename}`);
        } else {    // condition: files.length > 1
            files.forEach(function (file) {
                fs.readFile(file, function (err, data) {
                    if (err) {
                        console.log(err);
                    } else {
                        content = anchorsAweigh(data);
                        let [fileName, fileExtension] = file.split('.');
                        fs.writeFileSync(`${config.multiFilePrefix}${fileName}${config.multiFileSuffix}.${fileExtension}`, content);
                        console.log(file);
                    }
                });
            });
        }
    }
});