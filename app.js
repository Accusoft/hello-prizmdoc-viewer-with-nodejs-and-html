const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const indexRouter = require('./routes/index');
const createProxyRouteToPAS = require('./pas/createProxyRouteToPAS');
const app = express();
const fs = require('fs');
const config = require('./config/loadConfig');

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));

// Expose all of the files in the public directory as static assets which the browser can request.
// For example, for the file public/stylesheets/style.css, the browser can request /stylesheets/style.css.
app.use(express.static(path.join(__dirname, 'public')));

// Copy viewercontrol.js into the static viewer-assets directory.
// The viewer is made up of both UI parts that you can change and a core
// page-rendering JavaScript file, viewercontrol.js, which you cannot change. This
// core viewercontrol.js file is delivered via npm as part of the
// @prizmdoc/viewer-core package, and we just need to make sure that it is copied
// to the directory that hosts our static assets so that our HTML can request it.
fs.createReadStream('node_modules/@prizmdoc/viewer-core/viewercontrol.js').pipe(fs.createWriteStream('public/viewer-assets/js/viewercontrol.js'));

// Setup the proxy to PrizmDoc Application Services (PAS).
// The viewer will send all of its requests for document content to the
// /prizmdoc-applications-services route and the proxy will forward those requests
// on to PAS. If you are using PrizmDoc Cloud, the proxy will also inject your API
// key before forwarding the request.
app.use(createProxyRouteToPAS('/pas-proxy', config.pasBaseUrl, config.apiKey));

// Register the default route which will display a simple viewer.
app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res /*, next*/) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
