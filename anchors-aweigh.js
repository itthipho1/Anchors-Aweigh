// Configuration centre - start
const targetSelector = "main h1, main h2, main h3, main h4, main h5, main h6";
const skipLastX = 1;
const skipFirstX = 0;
const removeStopWords = true;
const multiFilePrefix = "output-";
const multiFileSuffix = "";
// Configuration centre - stop


// for file manageemnt
const fs = require('fs');
const glob = require("glob");

// for HTML properties
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

// Arguments
var inputFilename = process.argv[2];
var outputFilename = process.argv[3];

let anchorsAweigh = (content) => {
    const dom = new JSDOM(content);

    let allHeaders = dom.window.document.querySelectorAll(targetSelector);

    for (var i = 0 + skipFirstX; i < allHeaders.length - skipLastX; i++) {

        if (!allHeaders[i].hasAttribute("id") || allHeaders[i].getAttribute("id").length === 0) {
            // give it ID
            let headerWOaccents = allHeaders[i].textContent.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
            let headerWOspecialchars = headerWOaccents.replace(/[^a-zA-Z ]/g, "");
            let headerWOspaces;
            if (removeStopWords) {
                var sw = require('./stopword.js');
                headerWOspaces = sw.rmStopword(headerWOspecialchars);
            } else {
                headerWOspaces = headerWOspecialchars.replace(/  */g, '-');
            }
            idToLink = headerWOspaces.toLowerCase() + (i + 1);
            allHeaders[i].setAttribute("id", idToLink);
        } else {
            // already has ID
            idToLink = allHeaders[i].getAttribute("id");
        }


        /**
         *  Create anchor element
         **/
        const headerLink = dom.window.document.createElement('a');
        headerLink.setAttribute("class", "anchor-link");
        headerLink.setAttribute("href", "#" + idToLink);

        /**
         *  Anchor display options
         *      Option #1: #
         *         • similar to https://adamsilver.io/articles/bidirectional-scrolling-whats-not-to-like/
         *      Option #2: [chain link icon]
         *         • similar to GitHub [https://github.com/itthipho1/Anchors-Aweigh]
         **/
        // headerLink.textContent = "#";
        headerLink.innerHTML = '<span class="glyphicon glyphicon-link" aria-hidden="true"></span>';


        allHeaders[i].classList.add("has-anchor-link"); // Optional class to help w/ custom styling
        allHeaders[i].prepend(headerLink);
    }

    return dom.window.document.documentElement.outerHTML;

}


glob(inputFilename, function (err, files) {
    var content;

    if (err) {
        console.log(err);
    } else {
        if (files.length === 0) {
            console.log(err);
            console.log('No files found with \'' + inputFilename + '\'.');
        } else if (files.length === 1) {
            content = fs.readFileSync(inputFilename, 'utf8');
            content = anchorsAweigh(content);
            fs.writeFileSync(outputFilename, content);
            console.log(outputFilename);
        } else {    // condition: files.length > 1
            files.forEach(function (file) {
                fs.readFile(file, function (err, data) {
                    if (err) {
                        console.log(err);
                    } else {
                        content = anchorsAweigh(data);
                        let [fileName, fileExtension] = file.split('.');
                        fs.writeFileSync(multiFilePrefix + `${fileName}${multiFileSuffix}.${fileExtension}`, content);
                        console.log(file);
                    }
                });
            });
        }
    }
});