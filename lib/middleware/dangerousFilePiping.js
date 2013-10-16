var feather = require('../feather').getFeather(),
  path = require('path'),
  fs = require('fs');

function handleRequest(req, res, next) {

  //simply dump body to a file (not good in real life)
  fs.appendFile(path.join(feather.appOptions.appRoot, 'httpOutput.txt'), JSON.stringify(req.body) + '\n', function(err) {
    if (err) {
      feather.logger.error({category: 'http file writing', message: err});
    }

    res.writeHead(200, {'Content-Type': 'text'});
    res.end('message received');
  });
}

module.exports = feather.Connect.router(function(app) {

  app.get(/^\//, handleRequest);
  app.post(/^\//, handleRequest);

});