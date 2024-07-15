const express = require('express')
const cors = require('cors')
const routes = require('./routes/index.js');
const { PORT } = require('./config/app.js');
const { rateLimit } = require('express-rate-limit');

const app = express();

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: 'draft-7', // draft-6: RateLimit-* headers; draft-7: combined RateLimit header
	legacyHeaders: false, // X-RateLimit-* headers
	// store: ... , // Use an external store for more precise rate limiting
})

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Apply the rate limiting middleware to all requests
app.use(limiter)
app.use("/", routes);

module.exports = app