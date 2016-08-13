var fs = require('fs');
var conf = JSON.parse(fs.readFileSync('conf.json', 'utf8'));
var util = require('util');
var express = require('express');
var ODatabase = require('orientjs').ODatabase;

// Database init
var db = new ODatabase({
host:       conf.db.host,
port:       conf.db.port,
username:   conf.db.username,
password:   conf.db.password,
name:       conf.db.name
});

// HTTP Server init
var app = express();

// Make 3d a static folder, for development
app.use(express.static('3d'));

app.use(express.static('www'));

app.get('/Person/:person', function (req, res) {
        var person = req.params.person;

        db.open().then(function() {
                var query =
                    util.format("SELECT FROM Person WHERE firstName = '%s'",
                        person );
                console.log("query: %s", query);
                return db.query(query);
                }).then(function(qRes){
                    console.log('number of records: %d', qRes.length);
                    console.log('res: %s', util.inspect(qRes) );
                    db.close().then(function(){
                            console.log('closed');
                            });
                    res.send( qRes );
                    });
        });

var server = app.listen(conf.http.port, conf.http.address, function () {
        var host = server.address().address;
        var port = server.address().port;
        console.log("Example app listening at http://%s:%s", host, port)
        });
