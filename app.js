const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const indexRouter = require('./routes/index');
const createProxyRouteToPAS = require('./pas/createProxyRouteToPAS');
const config = require('./config/loadConfig');
const consolidate = require('consolidate');
const app = express();

// View engine setup
app.engine('hbs', consolidate.handlebars);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(logger('dev'));

// Expose all of the files in the public directory as static assets which the browser can request.
// For example, for the file public/stylesheets/style.css, the browser can request /stylesheets/style.css.
app.use(express.static(path.join(__dirname, 'public')));

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
