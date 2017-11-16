var rp = require('request-promise')
var fs = require('fs')

function Client (authToken) {
  // internal
  var generateUrl = function (endpoint) {
    return 'https://api.docparser.com/v1/' + endpoint
  }

  var parseJson = function (body, response, resolveWithFullResponse) {
      return JSON.parse(body)
  }

  this.httpClient = rp.defaults({
    headers: {
      'api_key': authToken
    },
    transform: parseJson,
    transform2xxOnly: true
  })

  // api methods
  this.ping = function () {
    return this.httpClient.get(generateUrl('ping'))
  }

  this.getParsers = function () {
    return this.httpClient.get(generateUrl('parsers'))
  }

  this.fetchDocumentFromURL = function (parserId, remoteURL, options) {
    var endpoint = generateUrl('document/fetch/' + parserId)
    var request = {
      url: remoteURL
    }

    if (options === undefined) {
      options = {}
    }

    if (options.remote_id) {
      request.remote_id = options.remote_id
    }

    return this.httpClient.post({
      url: endpoint,
      formData: request
    })
  }

  this.uploadFileByPath = function (parserId, filePath, options) {
    // check file existence
    if (fs.existsSync(filePath)) {
      // create read stream
      var stream = fs.createReadStream(filePath)
      // upload using uploadFileByStream method
      return this.uploadFileByStream(parserId, stream, options)
    }
  }

  this.uploadFileByStream = function (parserId, stream, options) {
    var endpoint = generateUrl('document/upload/' + parserId)
    var request = {
      file: {
        value: stream,
        options: {
          filename: null
        }
      }
    }

    if (options === undefined) {
      options = {}
    }

    if (options.remote_id) {
      request.remote_id = options.remote_id
    }

    if (options.filename) {
      request.file.options.filename = options.filename
    }

    return this.httpClient.post({
      url: endpoint,
      formData: request
    })
  }

  this.getResultsByDocument = function (parserId, documentId, options) {
    var endpoint = generateUrl('results/' + parserId + '/' + documentId)

    if (options === undefined) {
      options = {}
    }

    if (!options.format) {
      options.format = 'object'
    }

    return this.httpClient.get({
      url: endpoint,
      qs: options
    })
  }

  this.getResultsByParser = function (parserId, options) {
    var endpoint = generateUrl('results/' + parserId)

    if (options === undefined) {
      options = {}
    }

    if (!options.format) {
      options.format = 'object'
    }

    return this.httpClient.get({
      url: endpoint,
      qs: options
    })
  }

  // constructor
  this.authToken = authToken
}

module.exports.Client = Client
