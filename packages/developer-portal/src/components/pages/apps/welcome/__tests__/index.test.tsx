import React from 'react'
import { render } from '../../../../../tests/react-testing'
import AppsWelcomePage, { handeSetShowWizard } from '..'

describe('AppsWelcome', () => {
  it('should match a snapshot when apps are present', () => {
    expect(render(<AppsWelcomePage />)).toMatchSnapshot()
  })
})

describe('handeSetShowWizard', () => {
  it('should handle toggling wizard', () => {
    const setShowWizard = jest.fn()
    const curried = handeSetShowWizard(setShowWizard, true)

    curried()

    expect(setShowWizard).toHaveBeenCalledWith(false)
  })
})
