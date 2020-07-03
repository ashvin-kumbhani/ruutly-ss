const puppeteer = require('puppeteer');

async function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://siemens-staging.ruutly.com/share/98604/ja');
  await timeout(1000);

  const imageBuffer = await page.screenshot({
    type: 'jpeg',
    quality: 100,
    clip: {
      x: 0,
      y: 0,
      width: 640,
      height: 360,
    },
    omitBackground: true,
  });

  // const data = await page.screenshot({
  //   // path: 'example.jpg',
  //   // fullPage: true
  //   omitBackground: true,
  //   encoding: 'binary'
  // });
  await browser.close();
  console.log(">>>>>>>>", imageBuffer);
  // return screenshot;
})();

