import React from 'react'
import { shallow } from 'enzyme'
import AccountProgressBar from '../account-progress-bar'

describe('AccountProgressBar', () => {
  it('should match a snapshot', () => {
    expect(shallow(<AccountProgressBar percentageComplete={50} setPercentageComplete={jest.fn()} />)).toMatchSnapshot()
  })
})
