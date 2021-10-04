const express = require('express');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
// const hpp = require('hpp');

const app = express()

//==== Middlewares
app.use(helmet());  // Set security HTTP headers

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

module.exports = app;