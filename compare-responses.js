var http = require('http');
require ('colors');
var url = require('url');
var jsdiff = require('diff');

function getResponse(endpointAddress, callback){
	var response = "";
	var address = url.parse(endpointAddress);

	var options = {
		host: address.host,
		port: "80",
		path: address.path
	};

	http.get(options, function(resp){
		resp.on('data', function(chunk){
			response += chunk;
		});
		resp.on('end', function(){
			callback(response);
		});
	});
}

function diffResponses(firstResponse, secondResponse){
	return jsdiff.diffChars(firstResponse, secondResponse);
}

getResponse(process.argv[2], function(originalResponse){
	getResponse(process.argv[3], function(newResponse){
		var differences = diffResponses(originalResponse, newResponse);
		differences.forEach(function(part){
			var color = part.added ? 'green' :
				part.removed ? 'red' : 'grey';
			process.stderr.write(part.value[color]);
			console.log();	
		});
	});
});
