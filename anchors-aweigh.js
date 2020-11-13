// Load configuration file
const config = require('./config');

// load stopword module
const sw = require('./stopword.js');

// for HTML properties
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const generateAnchor = (content) => {
    const dom = new JSDOM(content);
    let allHeaders = dom.window.document.querySelectorAll(config.targetSelector);

    for (let i = 0 + config.skipFirstX; i < allHeaders.length - config.skipLastX; i++) {

        if (!allHeaders[i].hasAttribute("id") || allHeaders[i].getAttribute("id").length === 0) {
            // give it ID
            let headerWOaccents = allHeaders[i].textContent.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
            let headerWOspecialchars = headerWOaccents.replace(/[^a-zA-Z ]/g, "");
            let headerWOspaces;
            if (config.removeStopWords) {
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

        if (config.addAnchorIcon) {
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

    }

    return dom.window.document.documentElement.outerHTML;
};

exports.generateAnchor = generateAnchor;