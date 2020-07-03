var createError = require('http-errors');
var express = require('express');
var logger = require('morgan');

const puppeteer = require('puppeteer');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

async function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

app.use('/screenshot', async function (req, res) {
  console.log(">>>>>>", req.query);
  const { url } = req.query;

  const browser = await puppeteer.launch({
    'args': ['--no-sandbox',
      '--disable-setuid-sandbox'
    ]
  });
  const page = await browser.newPage();
  await page.goto(url);
  // await timeout(1000);

  await page.setViewport({
    width: 1220,
    height: 630,
  });

  const imageBuffer = await page.screenshot({
    encoding: "base64"
  });

  await browser.close();

  res.send({
    statusCode: 200,
    body: imageBuffer,
    isBase64Encoded: true,
    headers: {
      'Content-Type': 'image/png',
    }
  });
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
