// package dependencies
const colors = require("colors");
const cors = require("cors");
const dotenv = require("dotenv");
const express = require("express");
const helmet = require("helmet");
const hpp = require("hpp");
const mongoSanitize = require("express-mongo-sanitize");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const xss = require("xss-clean");

// import middleware
const errorHandler = require("./middleware/error");

// configuration files
const connectDB = require("./config/db");

// load environment variables
dotenv.config({ path: './config/config.env' });

// connect to database
connectDB();

// route files
const auth = require("./routes/auth");
const users = require("./routes/users");
const departments = require("./routes/departments");
const notes = require("./routes/notes");

// initiate express app
const app = express();

// body parser
app.use(express.json());

// dev logging middleware
if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// sanitize data / prevent noSQL injections
app.use(mongoSanitize());

// set security headers
app.use(helmet());

// prevent cross-site scripting attacks
app.use(xss());

// limit rate
const limiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 minutes
    max: 150
});
app.use(limiter);

// prevent http param pollution
app.use(hpp());

// enable cors
app.use(cors());

// mount routers
app.use('/api/v1/auth', auth);
app.use('/api/v1/users', users);
app.use('/api/v1/departments', departments);
app.use('/api/v1/notes', notes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`.yellow.bold));