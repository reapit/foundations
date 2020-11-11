import React from 'react'
import { mount } from 'enzyme'
import AccountProgressBar from '../account-progress-bar'

describe('AccountProgressBar', () => {
  const percentages = [0, 19, 39, 59, 79, 94, 99, 100]

  percentages.forEach(percent => {
    it(`should match a snapshot for ${percent} complete`, () => {
      expect(
        mount(<AccountProgressBar percentageComplete={percent} setPercentageComplete={jest.fn()} />),
      ).toMatchSnapshot()
    })
  })
})
