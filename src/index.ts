import { Browser, Builder, By, Key } from 'selenium-webdriver'
import chrome from 'selenium-webdriver/chrome'
import chalk from 'chalk'

const options = new chrome.Options()
options.addArguments('--headless');

(async () => {
  const driver = await new Builder()
    .forBrowser(Browser.CHROME)
    .setChromeOptions(options)
    .build()

  try {
    await driver.get('https://www.google.com/')
    await driver
      .findElement(By.xpath('//*[@id="APjFqb"]'))
      .sendKeys('bitcoin price usd', Key.RETURN)

    const bitcoinPrice = await driver
      .findElement(By.xpath('//*[@id="crypto-updatable_2"]/div[3]/div[2]/span[1]'))
      .getText()

    const priceIndicator = (await driver
      .findElement(By.xpath('//*[@id="crypto-updatable_2"]/div[3]/span/span[1]'))
      .getText())[0] === '+' ? chalk.green('▲') : chalk.red('▼')

    console.clear()
    console.log(chalk.bold.yellow(`The actual bitcoin price is: ${priceIndicator} ${bitcoinPrice} USD`))
  } finally {
    await driver.quit()
  }
})()
