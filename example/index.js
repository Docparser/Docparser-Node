var docparser = require('/Users/robin/WebstormProjects/docparser-node/docparser-node')
var chokidar = require('chokidar')
var path = require('path')

var docparserAPIKey = 'validApiKey'
var parserId = 'yourParserId'
var documentsFolder = '/home/user/folder'

var dpClient = new docparser.Client(docparserAPIKey)

var watcher = chokidar.watch(documentsFolder, {
  persistent: true,
  followSymlinks: false,
  ignoreInitial: true,
  usePolling: true,
  depth: undefined,
  interval: 100,
  ignorePermissionErrors: false,
  awaitWriteFinish: true
});

watcher.on('ready', function() {
  console.log('Completed initial scan - waiting for added files!')
  dpClient.getParsers(function(parsers) {
    console.log(typeof parsers)
    console.log(parsers)
  })
})

watcher.on('add', function(filePath) {
  console.log('file added, ' + filePath);
  dpClient.uploadFileByPath(parserId, filePath)
    .then(function(response) {
      console.log('Uploaded file ' + path.basename(filePath) + '\n' +
        '\t Document ID: ' + response.id + '\n' +
        '\t Remaining quota: ' + response.quota_left);
    })
    .catch(function(err) {
      console.log('Error uploading:')
      console.log(err)
    })
})
