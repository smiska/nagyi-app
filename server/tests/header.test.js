const Page = require('./helpers/page')

let page

beforeEach(async () => {
  page = await Page.build()
})

afterEach(async () => {
  await page.close()
})

describe('Main header tests', () => {
  beforeEach(async () => {
    await page.goto('http://localhost:3000')
  })

  test('Header loads correctly', async () => {
    const test = await page.getContentsOf('a.left.brand-logo');

    expect(test).toEqual('Blogster')
  })

  test('Login starts oAuth flow', async () => {
    await page.click('a[href="/auth/google"]')
    const url = page.url()
    expect(url).toMatch(/accounts\.google\.com/)
  })

  test('Logging in enables Logout navlink', async () => {
    await page.login()

    const test = await page.getContentsOf('a[href="/auth/logout"]');
    expect(test).toEqual('Logout')
  })
})
