const mongoose = require('mongoose');
const dotenv = require('dotenv');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const serverless = require('serverless-http');

dotenv.config({ path: './config.env' });
// const app = require('../app');

const DB = process.env.DATABASE.replace(
  // const DB = process.env.DATABASE_LOCAL.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then((con) => {
    console.log(con);
    console.log('DB connection successful!');
  });

// const port = process.env.PORT || 3000;
// app.listen(port, () => {
//   console.log(`App running on port ${port}...`);
// });

const wordRouter = require('../routes/wordRoutes');
const wordPublicRouter = require('../routes/wordPublicRoutes');

const app = express();

// 1) MIDDLEWARES
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(cors());

// app.use(cors({
//   origin: 'https://www.domainname.com'
// }))

app.options('*', cors());

app.use(express.json());

app.use((req, res, next) => {
  //console.log('Hello from the middleware');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// 3) ROUTES
app.use('/.netlify/functions/api/v1/words', wordRouter);
app.use('/.netlify/functions/api/v1/words-public', wordPublicRouter);

module.exports = app;
module.exports.handler = serverless(app);
