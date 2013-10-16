var _ = require('underscore'),
  fs = require('fs'),
  path = require('path'),
  net = require('net');

// if you implement onInit, you must call cb() when done, so the framework knows when to continue start-up
exports.onInit = function(feather, cb) {

  if (feather.config('tcpServers')) {
    _.each(feather.config('tcpServers'), function(server) {
      var output = fs.createWriteStream(path.join(feather.appOptions.appRoot, 'tcp' + server.port + '.txt'));
      var tcp = net.createServer(function (socket) {
        socket.pipe(output);
      });

      tcp.listen(server.port, server.host);
      feather.logger.info({category: 'tcp servers', message: 'tcp server listening at port ' + server.port + ' and host ' + server.host})
    });

    cb();
  }
};

exports.getMiddleware = function(feather, cb) {

  var middleware = [
    require('./lib/middleware/dangerousFilePiping')
  ];

  cb(null, middleware);
};