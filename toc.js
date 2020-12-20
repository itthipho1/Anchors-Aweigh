// for file manageemnt
const fs = require('fs');


const storeTOC = (tocObj) => {

    // convert object to string
    var tocStr = JSON.stringify(tocObj);

    // console.log(tocStr);

    // write to file
    fs.appendFileSync('toc.json', tocStr, 'utf8', function (err,data) {
        if (err) {
          return console.log(err);
        }
      });

};

exports.storeTOC = storeTOC;