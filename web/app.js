var express = require('express');
var app = express();

app.use(express.logger());

app.get('/', function(req, res){
  res.sendfile('./index.html');
});

app.listen(3000);
console.log('Listening on port 3000');
