// to remove Stop Words from text
sw = require('stopword')

module.exports.rmStopword = function (content) {
    const input = content.split(' ');
    const output = sw.removeStopwords(input);
    return output.join('-');
};