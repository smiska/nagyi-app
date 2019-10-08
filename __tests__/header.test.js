const puppeteer = require('puppeteer')
const Buffer = require('safe-buffer').Buffer
const Keygrip = require('keygrip')

let browser, page

beforeEach(async () => {
  browser = await puppeteer.launch({
    headless: false
  })

  page = await browser.newPage()
})

afterEach(async () => {
  // await browser.close()
})

describe('Main header tests', () => {
  beforeEach(async () => {
    await page.goto('localhost:3000')
  })

  test('Header loads correctly', async () => {
    const test = await page.$eval('a.left.brand-logo', el => el.innerHTML);

    expect(test).toEqual('Blogster')
  })

  test('Login starts oAuth flow', async () => {
    await page.waitFor('a[href="/auth/google"]')
    await page.click('a[href="/auth/google"]')
    const url = page.url()
    expect(url).toMatch(/accounts\.google\.com/)
  })

  test('Logging in enables Logout navlink', async () => {
    // from user create a session
    const cookieKey = require('../config/keys').cookieKey
    const keygrip = new Keygrip([cookieKey])

    const user = '5d9779b76a68ef4cb1e05c55'
    const sessionObject = {
      passport: {
        user: user
      }
    }
    const sessionString = Buffer.from(JSON.stringify(sessionObject)).toString('base64')
    const signature = keygrip.sign('session=' + sessionString)

    // set cookie
    await page.setCookie({ name: 'session', value: sessionString })
    await page.setCookie({ name: 'session.sig', value: signature })
    await page.goto('localhost:3000')

    await page.waitFor('a[href="/auth/logout"]')
    const test = await page.$eval('a[href="/auth/logout"]', el => el.innerHTML);
    expect(test).toEqual('Logout')
  })
})
