import React from 'react'
import { isAndroid, isIOS, isMacLike, isMobile } from '../device-detection'
import { render } from '../../../tests/react-testing'

let userAgentGetter

const TestHook = ({ callback }) => {
  return callback()
}
const testHook = (callback) => {
  render(<TestHook callback={callback} />)
}

describe('device-detection', () => {
  let result: boolean
  beforeEach(() => {
    userAgentGetter = jest.spyOn(window.navigator, 'userAgent', 'get')
    testHook(() => (result = isMobile()))
  })
  it('isAndroid', () => {
    userAgentGetter.mockReturnValue(
      'Mozilla/5.0 (Linux; Android 4.2.2; en-au; SAMSUNG GT-I9500 Build/JDQ39) AppleWebKit/535.19 ' +
        '(KHTML, like Gecko) Version/1.0 Chrome/18.0.1025.308 Mobile Safari/535.19',
    )
    expect(isAndroid()).toBeTruthy()
  })

  it('isIOS', () => {
    userAgentGetter.mockReturnValue(
      'Mozilla/5.0 (iPhone; CPU iPhone OS 12_2 like Mac OS X) AppleWebKit/605.1.15 ' +
        '(KHTML, like Gecko) Version/12.1 Mobile/15E148 Safari/604.1',
    )
    expect(isIOS()).toBeTruthy()
  })

  it('isMacLike', () => {
    userAgentGetter.mockReturnValue(
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 ' +
        '(KHTML, like Gecko) Chrome/76.0.3809.132 Safari/537.36',
    )
    expect(isMacLike()).toBeTruthy()
  })
  it('isMobile', () => {
    const output = false
    expect(result).toEqual(output)
  })
})
