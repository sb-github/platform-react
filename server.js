var express = require('express');
var app = express();

app.use(express.static(__dirname +'/build/'));
app.listen(80, function() {
	console.log('Node server listens on port 80');
});
