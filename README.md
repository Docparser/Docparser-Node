<p align="center">
<a href="https://docparser.com" title="Extract Data From PDF"><img width="280" src="https://docparser.com/img/logo.png"></a>
</p>

<h2 align="center">Official Docparser API JS Client</h2>

<p align="center"><code>docparser-js</code> provides convenient JavaScript bindings for the <a href="https://dev.docparser.com">Docparser API</a>.</p>

<hr>

<p align="center">
<b><a href="#documentation">Documentation</a></b>
|
<b><a href="#installation">Installation</a></b>
|
<b><a href="#configuration">Configuration</a></b>
|
<b><a href="#usage">Usage</a></b>
|
<b><a href="#contributing">Contributing</a></b>
|
<b><a href="#license">License</a></b>
|
<b><a href="#changelog">Changelog</a></b>
</p>
<hr>
<br>

## Documentation

For a generic description of the Docparser API, please see our developer documentation [here](https://docparser.com/). Our developer documentation lists all available API methods with their parameters and expected responses.

## Installation

This library is available from [npm](https://www.npmjs.com/).


```sh
npm install docparser-node
```

## Configuration

Create a Docparser JavaScript Client by using your Docparser API Token:

```js
var docparser = require('docparser-node');

var client = new docparser.Client("validAPIKey");
```

### Test Your Authentication
You can call our `ping()` method to test your API key. The method retuns a promise.

```js
client.ping()
  .then(function() {
    console.log('authentication succeeded!')
  })
  .catch(function(err) {
    console.log('authentication failed!')
  })
```
## Usage

### [Document Parsers](https://dev.docparser.com/#parsers)

**List All Document Parsers**
Returns a list of the document parsers created in your account.
```js
client.getParsers()
  .then(function (parsers) {
    console.log(parsers)
    // => [{"id":"someparserid","label":"My Document Parser"}]

  })
  .catch(function (err) {
    console.log(err)
  })
```

### [Documents](https://dev.docparser.com/#documents)

The Docparser JavaScript SDK offers two different methods for importing your document.

All import methods allow you to pass an optional `remote_id` with your document. The remote ID can be any arbitrary string with a maximum length of 255 characters. The submitted value will be kept throughout the processing and will be available later once you obtain the parsed data with our API or through Webhooks. The `remote_id` can be passed in the `options` object to our upload methods.

The upload methods (`uploadByPath`, `uploadByStream`) allow you to override the filename by specifying the `filename` parameter in `options`.

**Upload Document From Local File System**

Reads a file from your local filesystem and uploads it to your document parser.

```js
client.uploadFileByPath('someparserid', './test.pdf', {remote_id: 'test'})
  .then(function (result) {
    // => {"id":"document_id","file_size":198989,"quota_used":16,"quota_left":34,"quota_refill":"1970-01-01T00:00:00+00:00"}
  })
  .catch(function (err) {
    console.log(err)
  })
```

**Upload Document From A Readable Stream**

This method creates a new document in your document parser based on the raw file content or a file pointer. Additionally, a `filename` and a `remote_id` can be provided in the options object.

```js
client.uploadFileByStream('someparserid', fs.createReadStream('filepath'), options)
  .then(function (result) {
    // => {"id":"document_id","file_size":198989,"quota_used":16,"quota_left":34,"quota_refill":"1970-01-01T00:00:00+00:00"}
  })
  .catch(function (err) {
    console.log(err)
  })
```

**Fetch Document From An URL**

Imports a document from a publicly available HTTP(S) URL.
```js
client.fetchDocumentFromURL('someparserid', 'http://example.com/test.pdf', {remote_id: 'test'})
  .then(function (result) {
    // => {"id":"document_id","file_size":153914,"quota_used":17,"quota_left":33,"quota_refill":"1970-01-01T00:00:00+00:00"}
  })
  .catch(function (err) {
    console.log(err)
  })
```

### [Parsed Data](https://dev.docparser.com/#parsed-data)

The Docparser API allows you to retrieve the extracted document data. You can either list the data of multiple documents or get the data of a specific document.

Both methods used for retrieving parsed data allow you to specify the "format" parameter - this allows you to choose between a flat structure and a nested array structure. For most implementations, leaving it as "object" will serve you fine.

> Please note: Polling the API for new results is not the recommended way of obtaining your data. A much better way than polling our API for parsed data is to use [Webhooks](https://docparser.com/integration/webhooks). By using webhooks, parsed data will be pushed to your API immediately after parsing.

**Get Data Of One Document**

Fetches the parsed data for a specific document by providing a `parserId` and the `documentId`. The `documentId` is the Docparser Document ID which is returned when importing a document through the API.

```js
client.getResultsByDocument(parserId, documentId, {format: 'object'})
  .then(function (result) {
    console.log(result)
  })
  .catch(function (err) {
    console.log(err)
  })
```

**Get Data Of Multiple Documents**

Fetches the results of multiple documents parsed by a specific document parser. This function allows you granular filtering and ordering of the results. Please see our [documentation](https://dev.docparser.com/?shell#get-multiple-data-sets) for the list of available parameters.

```js
client.getResultsByParser(parserId, {format: 'object'})
  .then(function (result) {
    console.log(result)
  })
  .catch(function (err) {
    console.log(err)
  })
```

## Contributing

Bug reports and pull requests are welcome on [GitHub](https://github.com/docparser/docparser-node).

Please follow [Standard Code Style](https://github.com/standard/standard)  with your contributions. You can check for code style by running ```npm test``` when developing this library.

## License

The library is available as open source under the terms of the [MIT License](http://opensource.org/licenses/MIT).

### The MIT License (MIT)

*Copyright (c) 2016 DAUSINGER DIGITAL EURL.*

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

## Changelog
* 11/16/2017 initial release
