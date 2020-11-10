# Anchors-Aweigh
**Script purpose:** To automatically add anchors to headings.<br>


Default configurations have been set for this to work within the [Canada.ca WET template](https://github.com/wet-boew/GCWeb/releases/tag/v8.1.0), outside of AEM. You can easily modify this to work within AEM.

## Prerequisites
* [jsdom](https://github.com/jsdom/jsdom)
* [stopword](https://www.npmjs.com/package/stopword)* (optional if you deactivate feature)


## Installation
Prerequisites are already declared in package.json.<br>
Run the following command to install prerequisites.
```sh
npm install
```

## Usage
```sh
node anchors-aweigh.js input.html output.html
```

## Pre-loaded Usage Example
```sh
node anchors-aweigh.js sample.html output.html
```


## Configruation Notes / Default values
```javascript
const targetSelector = "main h1, main h2, main h3, main h4, main h5, main h6";
```
Adjust this to target which headers you want to modify.<br>
This is intended for the [Canada.ca WET template](https://github.com/wet-boew/GCWeb/releases/tag/v8.1.0) so we stay within ```<main>```
<br/><br/>


```javascript
const skipLastX = 1;
```
Option to skip the last X targeted selectors.<br>
This is intended for the [Canada.ca WET template](https://github.com/wet-boew/GCWeb/releases/tag/v8.1.0) so we skip the last heading
<br/><br/>


```javascript
const skipFirstX = 0;
```
Option to skip the first X targeted selectors
<br/><br/>


```javascript
const removeStopWords = true;
```
In natural language processing, "Stopwords" are words that are so frequent that they can safely be removed from a text without altering its meaning.<br><br>
This is option is good for those lengthy headers.
<br><br>
