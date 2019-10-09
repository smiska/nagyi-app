const Page = require('./helpers/page')

let page

beforeEach(async () => {
  page = await Page.build()
  await page.goto('localhost:3000')
})

afterEach(async () => {
  await page.close()
})

describe('When logged in and clicked new post button', () => {
  beforeEach(async () => {
    await page.login()
    await page.click('a[href="/blogs/new"]')
  })

  test('can see blog create form', async () => {
    const test = await page.getContentsOf('form label')
    expect(test).toEqual('Blog Title')
  })

  describe('When typed INVALID params in the form', () => {
    beforeEach(async () => {
      await page.click('form button')
    })

    test('it shows an error', async () => {
      const titleErr = await page.getContentsOf('.title .red-text')
      const contentErr = await page.getContentsOf('.content .red-text')
      expect(titleErr).toEqual('You must provide a value')
      expect(contentErr).toEqual('You must provide a value')
    })
  })

  describe('When typed VALID params in the form', () => {
    beforeEach(async () => {
      await page.type('.title input', 'My title')
      await page.type('.content input', 'My content')
      await page.click('form button')
    })

    test('submitting takes user to review screen', async () => {
      const confirmTxt = await page.getContentsOf('h5')
      expect(confirmTxt).toEqual('Please confirm your entries')
    })

    test('submitting adds new post to the list', async () => {
      await page.click('button.green')
      await page.waitFor('div.card')
      const titleTxt = await page.getContentsOf('div.card-content span.card-title')
      const contentTxt = await page.getContentsOf('div.card-content p')
      expect(titleTxt).toEqual('My title')
      expect(contentTxt).toEqual('My content')
    })
  })
})

describe('When NOT logged in', () => {
  test(`can't access blog list`, async () => {
    const result = await page.evaluate(
      () => {
        return fetch('/api/blogs', {
          method: 'GET',
          credentials: 'same-origin',
          headers: {
            'Content-Type': 'application/json'
          }
        }).then(res => res.json())
      }
    )
    expect(result).toEqual({ 'error': 'You must log in!' })
  })

  test(`can't access blog create`, async () => {
    const result = await page.evaluate(
      () => {
        return fetch('/api/blogs/new', {
          method: 'GET',
          credentials: 'same-origin',
          headers: {
            'Content-Type': 'application/json'
          }
        }).then(res => res.json())
      }
    )
    expect(result).toEqual({ 'error': 'You must log in!' })
  })

  test(`can't create new blog post`, async () => {
    const result = await page.evaluate(
      () => {
        return fetch('/api/blogs', {
          method: 'POST',
          credentials: 'same-origin',
          headers: {
            'Content-Type': 'application/json'
          }
        }).then(res => res.json())
      }
    )
    expect(result).toEqual({ 'error': 'You must log in!' })
  })
  // May also try it with direct API access without Chromium context for security

})