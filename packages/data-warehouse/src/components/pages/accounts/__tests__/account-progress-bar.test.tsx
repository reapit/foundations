import React from 'react'
import { render } from '../../../../tests/react-testing'
import AccountProgressBar from '../account-progress-bar'

describe('AccountProgressBar', () => {
  const percentages = [0, 19, 39, 59, 79, 94, 99, 100]

  percentages.forEach((percent) => {
    it(`should match a snapshot for ${percent} complete`, () => {
      expect(
        render(<AccountProgressBar percentageComplete={percent} setPercentageComplete={jest.fn()} />),
      ).toMatchSnapshot()
    })
  })
})
