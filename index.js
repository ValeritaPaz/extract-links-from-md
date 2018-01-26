var extract_links = require('./lib/extract_links');
var http = require('http');
var fs = require('fs');
var path = require('path');

// Crear Servidor Web
http.createServer(function (request, response) {
  //console.log('request ', request.url);

  var filePath = '.' + request.url;

  if (filePath == './') {
    filePath = './index.html';
  }

  var extname = String(path.extname(filePath)).toLowerCase();
  var contentType = 'text/html';
  var mimeTypes = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpg',
    '.gif': 'image/gif',
    '.wav': 'audio/wav',
    '.mp4': 'video/mp4',
    '.woff': 'application/font-woff',
    '.ttf': 'application/font-ttf',
    '.eot': 'application/vnd.ms-fontobject',
    '.otf': 'application/font-otf',
    '.svg': 'application/image/svg+xml'
  };

  contentType = mimeTypes[extname] || 'application/octet-stream';

  fs.readFile(filePath, function (error, content) {
    if (error) {
      if (error.code == 'ENOENT') {
        fs.readFile('./404.html', function (error, content) {
          response.writeHead(200, {
            'Content-Type': contentType
          });
          response.end(content, 'utf-8');
        });
      } else {
        response.writeHead(500);
        response.end('Sorry, check with the site admin for error: ' + error.code + ' ..\n');
        response.end();
      }
    } else {
      response.writeHead(200, {
        'Content-Type': contentType
      });
      response.end(content, 'utf-8');
    }
  });
  //console.log(request.url);
  //Capturando el request del index
  if (request.method == 'POST' && request.url == '/Extract') {
    var body = '';
    var links;

    request.on('data', text => {
      
      body += text;
      //console.log(links);
      //response.write(toString(links));
      //response.end(toString(links));

    });
    request.on('end', () => {
      //console.log(body);
      //console.log(response.body);
      response.end(JSON.stringify(extract_links.extract(body)),'utf8');
    });
  }

}).listen(8080);
console.log('Servidor Corriendo En http://127.0.0.1:8080/');