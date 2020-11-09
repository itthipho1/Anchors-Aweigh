# Anchors-Aweigh
**Script purpose:** To automatically add anchors to headings.<br>

The settings have been adjusted for this to work within the [Canada.ca WET template](https://github.com/wet-boew/GCWeb/releases/tag/v8.1.0), outside of AEM. You can easily modify this to work within AEM.

## Prerequisites
* jsdom


## Installation
Prerequisites are already declared in package.json.
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