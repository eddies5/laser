var http = require('http');
var url = require('url');

var server = http.createServer(function(req, res) {
	if (req.method == 'POST') {
		res.writeHead(200, { 'Content-Type': 'application/json' })
		// parses the request url
		urlobj = url.parse(req.url, true);

		if (urlobj.pathname == '/cat-laser/direction') {

      // gets the query part of the URL and parses it creating an object
      var queryObj = queryString.parse( theUrl.query );

      // queryObj will contain the data of the query as an object
      // and jsonData will be a property of it
      // so, using JSON.parse will parse the jsonData to create an object
      var obj = JSON.parse( queryObj.jsonData );
      
			res.end('');
		}
	}
});

server.listen(8080);
