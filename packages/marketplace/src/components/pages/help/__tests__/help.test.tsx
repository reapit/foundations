import * as React from 'react'
import { shallow } from 'enzyme'
import { Help } from '../help'

jest.mock('../../../../core/router', () => ({
  history: {
    push: jest.fn(),
  },
}))

describe('ClientHelpPage', () => {
  it('should match a snapshot', () => {
    expect(shallow(<Help />)).toMatchSnapshot()
  })
})
