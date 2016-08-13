var fs = require('fs');
var conf = JSON.parse(fs.readFileSync('conf.json', 'utf8'));
var util = require('util');
var express = require('express');
var ODatabase = require('orientjs').ODatabase;

// Database init
var db = new ODatabase({
        "host":       conf.db.host,
        "port":       conf.db.port,
        "username":   conf.db.username,
        "password":   conf.db.password,
        "name":       conf.db.name
        });

// HTTP Server init
var app = express();

// Make 3d a static folder, for development
app.use(express.static('3d'));

app.use(express.static('www'));

app.get('/Person/:fbAccountName', function (req, res) {
        var fbAccountName = req.params.fbAccountName;

        db.open().then(function() {
                var query =
                        "select expand(in()) from OnlineAccount where " +
                        "accountServiceHomepage = " +
                            "'https://www.facebook.com/' " +
                        "and accountName = :accountName";
                console.log("query: %s", query);
                return db.query(query, {
                    "params": {"accountName": fbAccountName},
                    "fetchPlan": "Person:-1"});
                }).then(function(qRes) {
                    console.log('number of records: %d', qRes.length);
                    db.close().then(function() {
                            console.log('closed');
                            });
                    res.set('Content-Type', 'text/plain');
                    res.send(util.inspect(qRes, {'depth': 50}));
                    });
        });

var server = app.listen(conf.http.port, conf.http.address, function () {
        var host = server.address().address;
        var port = server.address().port;
        console.log("Example app listening at http://%s:%s", host, port)
        });
