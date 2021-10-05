import { isAndroid, isIOS } from '..'

describe('Device Detection', () => {
  test('isAndroid', () => {
    const userAgentGetter = jest.spyOn(window.navigator, 'userAgent', 'get')
    userAgentGetter.mockReturnValue(
      'Mozilla/5.0 (Linux; Android 4.2.2; en-au; SAMSUNG GT-I9500 Build/JDQ39) AppleWebKit/535.19 ' +
        '(KHTML, like Gecko) Version/1.0 Chrome/18.0.1025.308 Mobile Safari/535.19',
    )
    expect(isAndroid()).toBeTruthy()
  })

  test('isIOS', () => {
    const userAgentGetter = jest.spyOn(window.navigator, 'userAgent', 'get')
    userAgentGetter.mockReturnValue(
      'Mozilla/5.0 (iPhone; CPU iPhone OS 12_2 like Mac OS X) AppleWebKit/605.1.15 ' +
        '(KHTML, like Gecko) Version/12.1 Mobile/15E148 Safari/604.1',
    )
    expect(isIOS()).toBeTruthy()
  })
})
