import * as React from 'react'
import { ETAButton } from '../eta-button'
import toJson from 'enzyme-to-json'
import { shallow } from 'enzyme'

let userAgentGetter

describe('ETAButton', () => {
  beforeEach(() => {
    userAgentGetter = jest.spyOn(window.navigator, 'userAgent', 'get')
  })
  it('Should match snapshot', () => {
    expect(toJson(shallow(<ETAButton tel="99999999">ETA Text</ETAButton>))).toMatchSnapshot()
  })

  it('Should include body message if using Android phone', () => {
    userAgentGetter.mockReturnValue(
      'Mozilla/5.0 (Linux; U; Android 1.6; en-us; HTC_TATTOO_A3288 Build/DRC79) AppleWebKit/528.5+ (KHTML, like Gecko) Version/3.1.2 Mobile Safari/525.20.1'
    )
    const wrapper = shallow(<ETAButton tel="1234" body="Hello, how are you?"></ETAButton>)
    expect(wrapper.find('[data-test="eta-button"]').prop('href')).toBe('sms:1234?body=Hello, how are you?')
  })
})
