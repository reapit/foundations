import React from 'react'
import { shallow } from 'enzyme'
import { ReapitProvider } from './../'

describe('NavStateProvider', () => {
  it('should match snapshot', () => {
    expect(shallow(<ReapitProvider />)).toMatchSnapshot()
  })
})
