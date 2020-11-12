# Anchors-Aweigh
**Script purpose:** To automatically add anchors to headings.<br>


Default configurations have been set for this to work within the [Canada.ca WET template](https://github.com/wet-boew/GCWeb/releases/tag/v8.1.0), outside of AEM.<br>You can easily modify this to work within AEM.
<br><br>
## Prerequisites
* [jsdom](https://github.com/jsdom/jsdom)
* [glob](https://www.npmjs.com/package/glob) (because [file globbing](https://en.wikipedia.org/wiki/Glob_(programming)) sucks on my work PC)
* [stopword](https://www.npmjs.com/package/stopword)* (optional)
<br><br>



## Install

To clone and run this application, you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. From your command line:

```zsh
# Clone this repository
$ git clone https://github.com/itthipho1/Anchors-Aweigh

# Go into the repository
$ cd Anchors-Aweigh

# Install dependencies
$ npm install
```
<br>

## How To Use

### Single file

```zsh
# Run the app
$ node anchors-aweigh.js 'input.html' 'output.html'
```
### Pattern match multiple files
When pattern matching multiple files, the output parameter (2 argument) is ignored. By default, ```'output-'``` is prefixed to every file.<br>
This can be changed in the config section.
```zsh
# Run the app
$ node anchors-aweigh.js 'chap*.html'
```
<br>

## Preloaded Usage Example
```zsh
node anchors-aweigh.js sample.html output.html
```
<br>

## Configuration Options and Default Values
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
Option to skip the first X targeted selectors.<br>
Not needed, but added for completeness.
<br/><br/>


```javascript
const removeStopWords = true;
```
In natural language processing, "Stopwords" are words that are so frequent that they can safely be removed from a text without altering its meaning.<br>
**Examples:** a, an, the, and, any, can, or
<br><br>
This option is good for those lengthy headers.
<br><br>


```javascript
const multiFilePrefix = "output-";
```
For use when pattern matching multiple files. The output parameter is ignored. Instead, we add a prefix to the input file name.
<br/><br/>

```javascript
const multiFileSuffix = "";
```
Suffix equivalent.
<br/><br/>



