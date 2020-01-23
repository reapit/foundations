import * as React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import WebComponents, { handleOnClickSearchWidget, handleCopiedClipboardTheme } from '../web-components'

jest.mock('../../../core/store')

describe('WebComponents', () => {
  it('should match a snapshot', () => {
    expect(toJson(shallow(<WebComponents />))).toMatchSnapshot()
  })

  describe('handleOnClickSearchWidget', () => {
    const setCopiedClipboardWidget = jest.fn()
    const fn = handleOnClickSearchWidget({ setCopiedClipboardWidget })
    const mockEvent = {
      preventDefault: jest.fn(),
      target: {
        id: 'mockId'
      }
    }
    // @ts-ignore
    fn(mockEvent)
    expect(setCopiedClipboardWidget).toBeCalled()
  })

  describe('handleCopiedClipboardTheme', () => {
    const setCopiedClipboardTheme = jest.fn()
    const fn = handleCopiedClipboardTheme({ setCopiedClipboardTheme })
    const mockEvent = {
      preventDefault: jest.fn(),
      target: {
        id: 'mockId'
      }
    }
    // @ts-ignore
    fn(mockEvent)
    expect(setCopiedClipboardTheme).toBeCalled()
  })
})
