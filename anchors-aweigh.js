// to READ file
var fs = require('fs');

// for HTML properties
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

// Arguments
var input = process.argv[2];
var output = process.argv[3];

let anchorsAweigh = (content) => {
    const dom = new JSDOM(content);

    /**
     *  Adjust this for targetting the headers important to have IDs
     *      This is intended for the Canada.ca WET template so:
     *          • we stay within <main>
     *          • we skip the last header (allHeaders.length-1)
     **/
    let allHeaders = dom.window.document.querySelectorAll("main h1, main h2, main h3, main h4, main h5, main h6");

    for (var i = 0; i < allHeaders.length-1; i++) {

        if (!allHeaders[i].hasAttribute("id") || allHeaders[i].getAttribute("id").length===0) {
            // give it ID
            let headerWOaccents = allHeaders[i].textContent.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
            let headerWOspecialchars = headerWOaccents.replace(/[^a-zA-Z ]/g, "");
            let headerWOspaces =  headerWOspecialchars.replace(/  */g, '-');
            idToLink = headerWOspaces + (i+1);
            allHeaders[i].setAttribute("id", idToLink);
        } else {
            // already has ID
            idToLink = allHeaders[i].getAttribute("id");
        }


        /**
         *  Create anchor el
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

var content = fs.readFileSync(input, 'utf8');

content = anchorsAweigh(content);

fs.writeFileSync(output, content);

console.log("DONE")