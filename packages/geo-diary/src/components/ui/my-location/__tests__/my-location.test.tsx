import React from 'react'
import { shallow } from 'enzyme'
import { MyLocation } from '../my-location'

jest.mock('../../../../core/app-state')

describe('MyLocation', () => {
  it('should match snapshot', () => {
    expect(shallow(<MyLocation />)).toMatchSnapshot()
  })
})
