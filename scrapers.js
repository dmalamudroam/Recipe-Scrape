const puppeteer = require('puppeteer');

async function scrapeRecipe(url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);

  const els = [];
  let i = 1;

  while (true) {
    const [el] = await page.$x(`//*[@id="ar-calvera-app"]/section[1]/fieldset/ul/li[${i}]/label/span/span`);
    if (el === undefined) break;
    //*[@id="ar-calvera-app"]/section[1]/fieldset/ul/li[1]/label/span/span
    const txt = await el.getProperty('textContent');
    const rawTxt = await txt.jsonValue();
    els.push(rawTxt);
    i++;
  }

  console.log({els});
}

scrapeRecipe('https://www.allrecipes.com/recipe/23600/worlds-best-lasagna/');