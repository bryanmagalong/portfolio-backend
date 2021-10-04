const express = require('express');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
// const hpp = require('hpp');

const AppError = require('./utils/AppError');
const skillRouter = require('./routes/skillRoutes');
const projectRouter = require('./routes/projectRoutes');

const app = express();

//==== Middlewares
app.use(helmet()); // Set security HTTP headers

// We want to call this middleware only on development environment
if (process.env.NODE_ENV === 'development') app.use(morgan('dev')); // generate response logs

// Rate Limit: to prevent DoS and brute force attacks
const limiter = rateLimit({
  max: 100, // max number of requests allowed
  windowMs: 60 * 60 * 1000, // allow "max" number request per IP / windowMs
  message: 'Too many request from this IP. Please try again in a hour.',
});

app.use('/api', limiter); // apply this limiter middleware only on our api
app.use(mongoSanitize()); // Data Sanitization against NoSQL Query Injection
app.use(xss()); // Data Sanitization against XSS

app.use('/api/v1/skills', skillRouter);
app.use('/api/v1/projects', projectRouter);

app.all('*', (req, res, next) => {
  /*
   * If an argument is passed in next(),
   * Express will assume that there was an error
   * and will skip all the middlewares in the middleware stack
   * and send the error to the error handling middleware */
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

module.exports = app;
