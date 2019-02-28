const {languageFO} = require('../selectors/FO/index');
const exec = require('child_process').exec;
const puppeteer = require('puppeteer');
let path = require('path');
let fs = require('fs');
let pdfUtil = require('pdf-to-text');

let options = {
  timeout: 30000,
  headless: false,
  defaultViewport: {
    width: 0,
    height: 0
  },
  args: [`--window-size=${1280},${1024}`]
};

global.tab = [];
global.isOpen = false;
global.param = [];

class CommonClient {

  async open() {
    global.browser = await puppeteer.launch(options);
    global.page = await this.getPage(0)
  }

  async getPage(id) {
    const pages = await browser.pages();
    return await pages[id];
  }

  async stopTracing() {
    await page.tracing.stop();
  }

  async close() {
    await browser.close();
  }

  async startTracing(testName = 'test') {
    await page.tracing.start({
      path: 'test/tracing/' + testName + '.json',
      categories: ['devtools.timeline']
    });
  }

  async signInBO(selector, link = global.URL, login = global.adminEmail, password = global.adminPassword) {
    await page.goto(link + '/admin-dev');
    await this.waitAndSetValue(selector.login_input, login);
    await this.waitAndSetValue(selector.password_inputBO, password);
    await this.waitForExistAndClick(selector.login_buttonBO);
    await page.waitFor(selector.menuBO, {timeout: 120000});
  }

  async waitAndSetValue(selector, value, wait = 0, options = {}) {
    await page.waitFor(wait);
    await page.waitFor(selector, options);
    await page.click(selector);
    await page.keyboard.down('Control');
    await page.keyboard.down('A');
    await page.keyboard.up('A');
    await page.keyboard.up('Control');
    await page.keyboard.press('Backspace');
    await page.type(selector, value);
  }

  async pause(timeoutOrSelectorOrFunction, options = {}) {
    await page.waitFor(timeoutOrSelectorOrFunction, options);
  }

  async waitForExistAndClick(selector, wait = 0, options = {}) {
    await page.waitFor(wait);
    await page.waitFor(selector);
    await page.click(selector, options);
  }

  async isVisible(selector, wait = 0, options = {}) {
    await page.waitFor(wait, options);
    global.isVisible = await page.$(selector) !== null;
  }

  async closeBoarding(selector) {
    if (global.isVisible) {
      await page.click(selector);
      await page.waitFor(2000);
    } else {
      await page.waitFor(1000);
    }
  }

  async screenshot(fileName = 'screenshot') {
    await page.screenshot({path: 'test/screenshots/' + fileName + global.dateTime + '.png'});
  }

  async goToSubtabMenuPage(menuSelector, selector) {
    let isOpen = false;
    let result = await page.evaluate((menuSelector) => {
      isOpen = document.querySelector(menuSelector).matches('open');
      return isOpen;
    }, menuSelector);
    if (result === false) {
      await this.waitForExistAndClick(menuSelector);
    }
    await this.waitForExistAndClick(selector, 2000);
  }

  async scrollWaitForVisibleAndClick(selector, pause = 0, timeout = 40000) {
    await page.waitFor(selector);
    await page.evaluate((selector) => {
      document.querySelector(selector).scrollIntoView();
    }, selector);
    await this.waitForVisibleAndClick(selector, pause, timeout)
  }

  async isExisting(selector, wait = 0) {
    await page.waitFor(wait);
    const exists = await page.$(selector) !== null;
    expect(exists).to.be.true;
  }

  async waitForVisibleAndClick(selector, wait = 0) {
    await page.waitFor(wait);
    await page.waitFor(selector, {visible: true});
    await page.click(selector);
  }

  async checkTextValue(selector, textToCheckWith, parameter = 'equal', wait = 0) {
    switch (parameter) {
      case "equal":
        await page.waitFor(wait);
        await page.waitFor(selector);
        await page.$eval(selector, el => el.innerText).then((text) => {
          if (text.indexOf('\t') != -1) {
            text = text.replace("\t", "");
          }
          expect(text.trim()).to.equal(textToCheckWith)
        });
        break;
      case "contain":
        await page.waitFor(wait);
        await page.waitFor(selector);
        await page.$eval(selector, el => el.innerText).then((text) => expect(text).to.contain(textToCheckWith));
        break;
      case "deepequal":
        await page.waitFor(wait);
        await page.waitFor(selector);
        await page.$eval(selector, el => el.innerText).then((text) => expect(text).to.deep.equal(textToCheckWith));
        break;
      case "notequal":
        await page.waitFor(wait);
        await page.waitFor(selector);
        await page.$eval(selector, el => el.innerText).then((text) => expect(text).to.not.equal(textToCheckWith));
        break;
      case "greaterThan":
        await page.waitFor(wait);
        await page.waitFor(selector);
        await page.$eval(selector, el => el.innerText).then((text) => expect(parseInt(text)).to.be.gt(textToCheckWith));
        break;
    }
  }

  async waitForSymfonyToolbar(AddProductPage, pause = 0) {
    await page.waitFor(pause);
    let exist = await page.$(AddProductPage.symfony_toolbar_block) !== null;
    if (exist) {
      await this.waitForExistAndClick(AddProductPage.symfony_toolbar);
    }
  }

  async alertAccept(action = 'accept') {
    switch (action) {
      case "accept":
        await page.on("dialog", (dialog) => {
          dialog.accept();
        });
        break;
      default :
        await page.on("dialog", (dialog) => {
          dialog.dismiss();
        });
    }
  }
  async scrollTo(selector) {
    await page.waitFor(selector);
    await page.evaluate((selector) => {
      document.querySelector(selector).scrollIntoView();
    }, selector);
  }
  async uploadPicture(fileName, selector) {
    const inputFile = await page.$(selector);
    await inputFile.uploadFile(path.join(__dirname, '..', 'datas', fileName));
  }

  async checkIsNotVisible(selector) {
    await page.waitFor(2000);
    await this.isVisible(selector);
    await expect(isVisible).to.be.false;
  }
  async isNotExisting(selector, wait = 0) {
    await page.waitFor(wait);
    const exists = await page.$(selector) === null;
    expect(exists).to.be.true;
  }
  async waitForExist(selector, wait = 0) {
    await page.waitFor(wait);
    await page.waitFor(selector);
  }
}

module.exports = CommonClient;
