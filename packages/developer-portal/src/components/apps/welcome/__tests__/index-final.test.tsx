import React from 'react'
import { render } from '../../../../tests/react-testing'
import AppsWelcomePage, { handleHasWatchedVideo } from '../index-final'

describe('AppsWelcome', () => {
  it('should match a snapshot when apps are present', () => {
    expect(render(<AppsWelcomePage />)).toMatchSnapshot()
  })
})

describe('handleHasWatchedVideo', () => {
  it('should handle toggling wizard', () => {
    const setHasWatchedVideo = jest.fn()
    const closeModal = jest.fn()
    const curried = handleHasWatchedVideo(setHasWatchedVideo, closeModal)

    curried()

    expect(setHasWatchedVideo).toHaveBeenCalledWith(true)
    expect(closeModal).toHaveBeenCalledTimes(1)
  })
})
