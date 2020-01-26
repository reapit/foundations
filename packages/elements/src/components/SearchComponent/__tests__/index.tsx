import React from 'react'
import { shallow } from 'enzyme'
import { SearchComponent, handleUseEffect } from '../index'

describe('SearchComponent', () => {
  it('should match snapshot', () => {
    const wrapper = shallow(<SearchComponent />)
    expect(wrapper).toMatchSnapshot()
  })

  it('handleUseEffect', () => {
    const mockTheme = {}
    // @ts-ignore
    window.initReaptSearchWidget = jest.fn()
    const fn = handleUseEffect({ theme: mockTheme })
    fn()
    // @ts-ignore
    expect(window.initReaptSearchWidget).toBeCalledWith({ API_KEY: 'abc', theme: mockTheme })
  })
})
