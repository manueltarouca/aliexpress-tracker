import pup, { Page } from 'puppeteer';
import scheduler from 'node-schedule';
import { PRODUCT_URL } from './constants';


(async () => {
  const checkPageContent = async (fireDate: Date) => {
    console.log('Job started at [%s]', fireDate.toISOString());
    const browser = await pup.launch();
    const page = await browser.newPage();
    await page.goto(PRODUCT_URL);
    const elementExists = await page.$('.customs-message-wrap') !== null;
    if (elementExists) {
      const htmlContent = await page.evaluate(() => {
        return document.querySelector('.customs-message-wrap')?.innerHTML;
      });
      console.log(htmlContent);
    } else {
      console.log('No custom message found.');
    }
  
    await browser.close();
  }
  const job = scheduler.scheduleJob('* * * * *', checkPageContent);
})()




