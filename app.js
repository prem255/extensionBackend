const express = require('express');
const cors = require('cors');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const userRouter = require(`./routes/userRoutes`);
const app = express();
app.use(cors());
app.options('*', cors());
app.use(express.json({ limit: '10kb' })); //express.json() is the middleware
app.use(express.urlencoded({ extended: true, limit: '10kb' }));


//Routes
app.use('/api/v1/company', userRouter);

app.all('*', (req, res, next) => {

  // err.statusCode = 404;
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
  // next(err);
});

app.use(globalErrorHandler);

module.exports = app;
