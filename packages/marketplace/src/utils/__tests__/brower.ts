import { isIE } from '../brower'

describe('Brower unity', () => {
  test('is IE', () => {
    // @ts-ignore
    window.navigator.__defineGetter__('userAgent', function() {
      return 'Mozilla/5.0 (Windows NT 10.0; WOW64; Trident/7.0; rv:11.0) like Gecko'
    })

    expect(isIE()).toBeTruthy()
  })
})
