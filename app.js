
/**
 * Module dependencies.
 */

var Prelude = require('prelude-ls');
var sqlite = require('sqlite3').verbose();
var lightOrm = require('light-orm');
lightOrm.driver = new sqlite.Database('db.sqlite');
var http = require('http');

var express = require('express')
  , routes = require('./routes')
//  , user = require('./routes/user')
//  , photobombs = require('./routes/photobombs')
  , frontend = require('./routes/frontend')
  , http = require('http')
  , path = require('path');

var app = express();
var partials = require('express-partials');

app.configure(function(){
  app.set('port', process.env.PORT || 4000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');

  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('your secret here'));
  app.use(express.session());
  app.use(app.router);

  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});
//app.use(partials());

app.get('/', frontend.top);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
