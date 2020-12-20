const config = {};

config.targetSelector = "main h1, main h2, main h3, main h4, main h5, main h6";

config.skipLastX = 1;
config.skipFirstX = 0;

config.removeStopWords = true;

config.multiFilePrefix = "output-";
config.multiFileSuffix = "";

config.addAnchorIcon = true;

config.generateToC = true;

module.exports = config;